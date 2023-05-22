import { useEffect, useRef, useState } from 'react';

const verbs = ['get', 'post', 'put', 'delete', 'patch'] as const;
type HttpVerb = (typeof verbs)[number];

type VerbRequest<Response = unknown> = (
  url: string,
  payload?: Record<string | number | symbol, unknown>
) => Promise<Response>;

const errorLog = (...args: string[]) =>
  console.error('GOOGLE_AUTOCOMPLETE_ERROR', ...args);

type VerbRequests<R = unknown> = Record<HttpVerb, VerbRequest<R>>;

/**
 * Fetch response from API expecting a JSON response.
 */
const useFetch = <ResponseT = undefined>(): {
  request: VerbRequests<ResponseT>;
  response: ResponseT | null;
  isLoading: boolean;
} => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseT | null>(null);

  const controllerRef = useRef<AbortController | null>();

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const requestFactory =
    (method: HttpVerb): VerbRequest =>
    async <T extends Record<string | number | symbol, unknown>>(
      url: string,
      payload?: T
    ): Promise<unknown> => {
      setLoading(true);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      try {
        controllerRef.current = new AbortController();
        const res = (await (
          await fetch(url, {
            method,
            signal: controllerRef.current?.signal,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
          })
        ).json()) as ResponseT & { error_message?: string; status?: string };

        if (res.error_message) {
          errorLog(res.error_message, res?.status ?? '');
        }

        setResponse(res);

        return res;
      } catch (e) {
        errorLog((e as Error)?.message ?? 'Unknown Error');
        setResponse(null);
        return null;
      } finally {
        setLoading(false);
        controllerRef.current = null;
      }
    };

  const request: VerbRequests<ResponseT> = Object.fromEntries(
    verbs.map((verb: HttpVerb) => [verb, requestFactory(verb)])
  ) as VerbRequests<ResponseT>;

  return {
    request,
    response,
    isLoading,
  };
};

export default useFetch;
