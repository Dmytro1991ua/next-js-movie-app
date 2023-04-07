import { useCallback, useMemo, useState } from "react";

import { getTruncatedLongText } from "@/utils/utils";

interface HookProps {
  text: string;
  limit: number;
}

interface ReturnedHookType {
  isReadMore: boolean;
  truncatedLongText: string;
  onToggleReadMoreButton: () => void;
}

export const useReadMore = ({ text, limit }: HookProps): ReturnedHookType => {
  const [isReadMore, setIsReadMore] = useState<boolean>(false);

  const truncatedLongText = useMemo(
    () => getTruncatedLongText(text, limit),
    [limit, text]
  );

  const onToggleReadMoreButton = useCallback(
    () => setIsReadMore(!isReadMore),
    [isReadMore]
  );

  return { isReadMore, truncatedLongText, onToggleReadMoreButton };
};
