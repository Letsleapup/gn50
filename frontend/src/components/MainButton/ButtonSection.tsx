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
    <div className="button-section-container">
      <div className="button-section-wrapper">
        <div className="button-section-grid">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonClick(button.path)}
              className={`action-button ${button.bgColor}`}
            >
              <div className="text-and-arrow-container">
                <div className="button-text">
                  {button.title.map((line, index) => (
                    <span key={index} className="button-title">
                      {line}
                    </span>
                  ))}
                </div>

                <img
                  src="/asset/arrow_up_r.svg"
                  alt="arrow_up"
                  className="button-arrow"
                />
              </div>

              <img
                src={button.imgUrl}
                alt="button-background"
                className="button-background"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonSection;
