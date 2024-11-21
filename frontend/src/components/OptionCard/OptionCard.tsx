import React from "react";
import { SelectOption } from "../../@types/domain";
import "./OptionCard.css";
import { BASE_URL } from "../../const/const";
import { logger } from "../../util/logger";

interface OptionCardProps {
  options: SelectOption[];
  type: "walking" | "webtoon";
  onSelect: (option: SelectOption) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  options,
  type,
  onSelect,
}) => {
  logger.log("OptionCard rendering with options:", options);

  return (
    <div
      className={`${type === "walking" ? "yg_option-grid" : "cr_option-grid"} ${
        type === "walking" ? "yg_option-grid-walking" : "cr_option-grid-webtoon"
      }`}
    >
      {options.map((option) => (
        <div key={option.idx} className="flex justify-center">
          <button
            onClick={() => {
              // console.log("Option selected:", option);
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
                  src={`${BASE_URL}${option.url}` || "https://via.placeholder.com/384x240"}
                  alt={option.title}
                  className="yg_option-image-walking"
                  onError={(e) => {
                    console.error("Image loading failed:", option.url);
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
                  src={`${BASE_URL}${option.backinfo_file1}`}
                  alt={option.backinfo_title}
                  className="cr_option-webtoon-image"
                  onError={(e) => {
                    console.error("Image loading failed:", option.backinfo_file1);
                    e.currentTarget.src = "https://via.placeholder.com/486x304";
                  }}
                />

                <div className="cr_option-webtoon-text">
                  {option.backdrop && (
                    <p className="cr_option-webtoon-backdrop">
                      {option.backdrop}
                    </p>
                  )}
                  <h2 className="cr_option-webtoon-title">{option.backinfo_title}</h2>
                  {option.backinfo_intro_txt && (
                    <p className="cr_option-webtoon-description">
                      {option.backinfo_intro_txt}
                    </p>
                  )}
                  {option.backinfo_hashtag &&
                    option.backinfo_hashtag.length > 0 && (
                      <div className="cr_hashtags-container">
                        {option.backinfo_hashtag
                        .split(" ")
                        .map((tag: string, index: number) => (
                          <span
                            key={`${option.idx}-tag-${index}`}
                            className="cr_hashtag"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )
                  }
                </div>
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};
