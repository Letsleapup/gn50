import React from "react";
import { Option } from "../../@types/domain";
import "./OptionCard.css";

interface OptionCardProps {
  options: Option[];
  type: "walking" | "webtoon";
  onSelect: (option: Option) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  options,
  type,
  onSelect,
}) => {
  console.log("OptionCard rendering with options:", options);

  return (
    <div
      className={`${type === "walking" ? "yg_option-grid" : "cr_option-grid"} ${
        type === "walking" ? "yg_option-grid-walking" : "cr_option-grid-webtoon"
      }`}
    >
      {options.map((option) => (
        <div key={option.id} className="flex justify-center">
          <button
            onClick={() => {
              console.log("Option selected:", option);
              onSelect(option);
            }}
            className={`${
              type === "walking" ? "yg_option-button" : "cr_option-button"
            } ${
              type === "walking"
                ? "yg_option-button-walking"
                : "cr_option-button-webtoon"
            }`}
          >
            {type === "walking" ? (
              <div>
                <img
                  src={option.imgUrl || "https://via.placeholder.com/384x240"}
                  alt={option.title}
                  className="yg_option-image-walking"
                  onError={(e) => {
                    console.error("Image loading failed:", option.imgUrl);
                    e.currentTarget.src = "https://via.placeholder.com/384x240";
                  }}
                />
                <div className="yg_option-title-container">
                  <span className="yg_option-title">{option.title}</span>
                </div>
              </div>
            ) : (
              <div className="cr_option-webtoon-content">
                <img
                  src={option.imgUrl}
                  alt={option.title}
                  className="cr_option-webtoon-image"
                  onError={(e) => {
                    console.error("Image loading failed:", option.imgUrl);
                    e.currentTarget.src = "https://via.placeholder.com/486x304";
                  }}
                />

                <div className="cr_option-webtoon-text">
                  {option.backdrop && (
                    <p className="cr_option-webtoon-backdrop">
                      {option.backdrop}
                    </p>
                  )}
                  <h2 className="cr_option-webtoon-title">{option.title}</h2>
                  {option.description && (
                    <p className="cr_option-webtoon-description">
                      {option.description}
                    </p>
                  )}
                  {Array.isArray(option.hashtags) &&
                    option.hashtags.length > 0 && (
                      <div className="cr_hashtags-container">
                        {option.hashtags.map((tag: string, index: number) => (
                          <span
                            key={`${option.id}-tag-${index}`}
                            className="cr_hashtag"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};
