import React, { useContext, useState } from "react";
import { LangContext } from "../contexts/LanguageContext";

const WHITE_COLOR = "#FFFFFF";
const GRAY_COLOR = "#545454";

const Footer = () => {
  const { t } = useContext(LangContext);
  const [authorColor, setAuthorColor] = useState(GRAY_COLOR);
  const [professionColor, setProfessionColor] = useState(GRAY_COLOR);

  const [linkedinIconColors, setLinkedinIconColors] = useState({
    background: GRAY_COLOR,
    icon: WHITE_COLOR,
  });

  const [githubIconColors, setGithubIconColors] = useState({
    background: WHITE_COLOR,
    icon: GRAY_COLOR,
  });

  const handleLinkedinIconHover = (isHovered) => {
    setAuthorColor(isHovered ? WHITE_COLOR : GRAY_COLOR);
    setLinkedinIconColors({
      background: isHovered ? WHITE_COLOR : GRAY_COLOR,
      icon: isHovered ? GRAY_COLOR : WHITE_COLOR,
    });
  };

  const handleGithubIconHover = (isHovered) => {
    setProfessionColor(isHovered ? WHITE_COLOR : GRAY_COLOR);
    setGithubIconColors({
      background: isHovered ? GRAY_COLOR : WHITE_COLOR,
      icon: isHovered ? WHITE_COLOR : GRAY_COLOR,
    });
  };

  return (
    <footer className="footer">
      <p className="footer__copyrights">&copy; 2023 Around The U.S.</p>
      <aside className="footer__aside">
        <div className="footer__social-links">
          <ul className="footer__list">
            <li>
              <a
                href="https://www.linkedin.com/in/evandrodemelo/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={() => handleLinkedinIconHover(true)}
                onMouseOut={() => handleLinkedinIconHover(false)}
              >
                <svg
                  fill={linkedinIconColors.icon}
                  version="1.1"
                  className="footer__linkedin-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="32px"
                  height="32px"
                  viewBox="0 0 490.732 490.732"
                  xmlSpace="preserve"
                >
                  <defs>
                    <style>
                      {`
                        .background { fill: ${linkedinIconColors.background}; }
                        .icon-color { fill: ${linkedinIconColors.icon}; }
                      `}
                    </style>
                  </defs>
                  <rect
                    className="background"
                    width="490.732"
                    height="490.732"
                  />
                  <g className="icon-color">
                    <path
                      d="M472.366,0.003H18.36C8.219,0.003,0,8.222,0,18.363v454.005c0,10.143,8.219,18.361,18.36,18.361h454.012
                			c10.142,0,18.36-8.219,18.36-18.361V18.363C490.727,8.222,482.507,0.003,472.366,0.003z M130.375,403.808
                			c0,6.762-5.478,12.238-12.24,12.238H69.132c-6.756,0-12.24-5.477-12.24-12.238V189.625c0-6.763,5.484-12.24,12.24-12.24h49.003
                			c6.762,0,12.24,5.477,12.24,12.24V403.808z M130.375,127.482c0,6.763-5.478,12.24-12.24,12.24H69.132
                			c-6.756,0-12.24-5.478-12.24-12.24V83.969c0-6.763,5.484-12.24,12.24-12.24h49.003c6.762,0,12.24,5.477,12.24,12.24V127.482z
                			 M433.835,403.808c0,6.762-5.483,12.238-12.24,12.238h-49.003c-6.763,0-12.24-5.477-12.24-12.238v-90.436
                			c0-29.988-1.566-49.383-4.712-58.189c-3.14-8.807-8.237-15.649-15.3-20.526c-7.062-4.884-15.558-7.32-25.496-7.32
                			c-12.729,0-24.149,3.488-34.26,10.459c-10.11,6.977-17.038,16.211-20.79,27.717c-3.745,11.506-5.618,32.779-5.618,63.807v74.488
                			c0,6.762-5.483,12.238-12.24,12.238h-49.003c-6.756,0-12.24-5.477-12.24-12.238V189.625c0-6.763,5.483-12.24,12.24-12.24h43.771
                			c6.763,0,12.24,5.477,12.24,12.24v16.316c0,6.763,3.312,7.852,7.858,2.852c22.864-25.123,50.753-37.687,83.673-37.687
                			c16.212,0,31.028,2.919,44.455,8.758c13.422,5.838,23.58,13.292,30.466,22.356c6.885,9.063,11.683,19.351,14.382,30.857
                			c2.699,11.505,4.058,27.98,4.058,49.426V403.808L433.835,403.808z"
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/evandro-developer"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={() => handleGithubIconHover(true)}
                onMouseOut={() => handleGithubIconHover(false)}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="4 4 24 24"
                  className="footer__github-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0"
                    y="0"
                    width="32"
                    height="32"
                    fill={githubIconColors.background}
                  />
                  <path
                    d="M28 1c1.654 0 3 1.346 3 3v24c0 1.654-1.346 3-3 3H4c-1.654 0-3-1.346-3-3V4c0-1.654 1.346-3 3-3h24m0-1H4C1.8 0 0 1.8 0
                    4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4z"
                    fill={githubIconColors.icon}
                  />
                  <path
                    d="M19.613 25.958h-5.309s.007-1.575 0-2.656c-3.633.782-4.647-1.992-4.647-1.992-.664-1.328-1.328-1.992-1.328-1.992-1.328-.789 0-.664
                    0-.664 1.328 0 1.992 1.328 1.992 1.328 1.165 1.978 3.238 1.66 3.983 1.328 0-.664.291-1.668.664-1.992-2.9-.327-5.314-1.992-5.314-5.311s.667-3.983
                    1.33-4.647c-.134-.327-.69-1.537.021-3.319 0 0 1.305 0 2.632 1.992.658-.658 2.656-.664 3.32-.664.663 0 2.661.006 3.318.664
                    1.328-1.992 2.636-1.992 2.636-1.992.71 1.783.155 2.992.02 3.319.664.664 1.328 1.328 1.328 4.647s-2.411 4.984-5.311 5.311c.374.324.664
                    1.467.664 1.992l.001 4.648z"
                    fill={githubIconColors.icon}
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__author-info">
          <p className="footer__author" style={{ color: authorColor }}>
            {t("footer.author")}
          </p>
          <p className="footer__profession" style={{ color: professionColor }}>
            {t("footer.profession")}
          </p>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
