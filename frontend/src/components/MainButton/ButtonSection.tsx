import "./ButtonSection.css";

interface ButtonSectionProps {
  actionButtons: Array<{
    id: number;
    title: string[];
    path: string;
    bgColor: string;
    imgUrl: string;
  }>;
  onButtonClick: (path: string) => void;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({
  actionButtons,
  onButtonClick,
}) => {
  return (
    <div className="cr_button-section-container">
      <div className="cr_button-section-wrapper">
        <div className="cr_button-section-grid">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonClick(button.path)}
              className={`cr_action-button ${button.bgColor}`}
            >
              <div className="cr_text-and-arrow-container">
                <div className="cr_button-text">
                  {button.title.map((line, index) => (
                    <span key={index} className="cr_button-title">
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <img
                src="/asset/arrow_up_r.svg"
                alt="arrow_up"
                className="cr_button-arrow"
              />

              <img
                src={button.imgUrl}
                alt="button-background"
                className="cr_button-background"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonSection;
