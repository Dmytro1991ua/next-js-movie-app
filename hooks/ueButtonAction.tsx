import { useCallback, useState } from "react";

type ReturnedHookType = {
  clickedButtonId: string | number | null;
  isSubmitting: boolean;
  onSubmitting: () => void;
  onHandleButtonClick: (id: string | number, onClick: () => void) => void;
};

export const useButtonAction = (): ReturnedHookType => {
  const [clickedButtonId, setClickedButtonId] = useState<
    string | number | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onHandleButtonClick = useCallback(
    (id: string | number, onClick: () => void) => {
      setClickedButtonId(id);
      onClick();
    },
    []
  );

  const onSubmitting = useCallback(() => setIsSubmitting(true), []);

  return { clickedButtonId, onHandleButtonClick, isSubmitting, onSubmitting };
};
