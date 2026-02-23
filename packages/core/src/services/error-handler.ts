export interface EvolinkApiError {
  error: {
    code: number;
    message: string;
    type: string;
    param?: string;
    fallback_suggestion?: string;
  };
}

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request parameters',
  401: 'Invalid or expired API Key. Check EVOLINK_API_KEY',
  402: 'Insufficient balance. Top up at https://evolink.ai/dashboard/billing',
  403: 'Access denied',
  404: 'Resource not found',
  413: 'Request too large. Compress images to under 4MB',
  429: 'Rate limit exceeded. Please retry later',
  500: 'Evolink internal server error',
  502: 'Upstream service unavailable',
  503: 'Service temporarily unavailable. Please retry later',
};

const BUSINESS_ERROR_MESSAGES: Record<string, string> = {
  content_policy_violation: 'Prompt triggered content safety review. Please revise your description and retry.',
  model_unavailable: 'This model is currently unavailable. Use list_models to see available models.',
  insufficient_quota: 'Insufficient account balance. Top up at https://evolink.ai/dashboard/billing',
};

export function formatApiError(status: number, body: unknown): string {
  const apiError = body as EvolinkApiError;
  if (apiError?.error?.message) {
    const businessHint = BUSINESS_ERROR_MESSAGES[apiError.error.type] ?? '';
    const suggestion = apiError.error.fallback_suggestion
      ? `\nSuggestion: ${apiError.error.fallback_suggestion}`
      : '';
    const hint = businessHint ? `\nHint: ${businessHint}` : '';
    return `[${status}] ${apiError.error.message}${suggestion}${hint}`;
  }
  return `[${status}] ${HTTP_ERROR_MESSAGES[status] ?? 'Unknown error'}`;
}
