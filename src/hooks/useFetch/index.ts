import { useState } from 'react';

const verbs = ['get', 'post', 'put', 'delete', 'patch'] as const;
type HttpVerb = (typeof verbs)[number];

type VerbRequest<Response = unknown> = (
  url: string,
  payload?: Record<string | number | symbol, unknown>
) => Promise<Response>;

type VerbRequests<R = unknown> = Record<HttpVerb, VerbRequest<R>>;

/**
 * Fetch response from API expecting a JSON response.
 */
const useFetch = <ResponseT = undefined>(): {
  request: VerbRequests<ResponseT>;
  response: ResponseT | undefined;
  isLoading: boolean;
} => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseT>();

  const requestFactory =
    (method: HttpVerb): VerbRequest =>
    async <T extends Record<string | number | symbol, unknown>>(
      url: string,
      payload?: T
    ): Promise<unknown> => {
      setLoading(true);

      const res = (await (
        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      ).json()) as ResponseT;

      setResponse(res);
      setLoading(false);
      return res;
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
