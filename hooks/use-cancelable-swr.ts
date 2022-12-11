import useSWRImmutable from 'swr/immutable';

export default function useCancelableSWR (key, opts) {
    const controller = new AbortController();
    return [useSWRImmutable(key, url => fetch(url, { signal: controller.signal }), opts), controller]
};
