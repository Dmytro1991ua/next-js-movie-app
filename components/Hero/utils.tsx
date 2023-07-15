import { heroContentActionButtonsConfig } from "./configs";
import { HeroContentActionButtonConfig } from "./types";
import Button from "../Button";

export const getHeroContentActionButtons = ({
  onDetailsBtnClick,
  onPlayBtnClick,
  isLoading,
  clickedButtonId,
  onHandleButtonClick,
}: HeroContentActionButtonConfig) => {
  const heroContentActionButtons = heroContentActionButtonsConfig({
    onDetailsBtnClick,
    onPlayBtnClick,
    isLoading,
  });

  return (
    <div className="flex gap-2">
      {heroContentActionButtons.map(
        ({ icon, id, label, variant, isLoading, onClick }) => (
          <Button
            key={id}
            isLoading={isLoading && clickedButtonId === id}
            variant={variant}
            onClick={() =>
              onHandleButtonClick && onHandleButtonClick(id, onClick)
            }
          >
            {icon}&nbsp;{label}
          </Button>
        )
      )}
    </div>
  );
};
