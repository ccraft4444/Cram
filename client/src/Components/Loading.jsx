import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";

export default function Loading({ onResponseChange, studyGuide, route }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("sg in loading", studyGuide);
    async function fetchData() {
      const result = await axios.post(`/routes/langChain/${route}`, {
        studyGuide,
      });
      onResponseChange(result.data);
    }
    fetchData();
    navTime();
  }, [studyGuide, route]);

  function navTime() {
    setTimeout(() => {
      navigate("/response");
    }, 5000);
  }

  return (
    <div className="container">
      <h1>Cramming in progress</h1>
      <hr />
      <div className="rowington">
        <svg
          width="96"
          height="150"
          viewBox="0 0 96 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_ddddd_0_1)">
            <circle cx="48" cy="29" r="25" fill="black" />
          </g>
          <path
            opacity="0.2"
            d="M61.7077 23.657L45.6577 39.707C45.5648 39.8 45.4545 39.8738 45.3331 39.9241C45.2117 39.9744 45.0816 40.0003 44.9502 40.0003C44.8187 40.0003 44.6886 39.9744 44.5672 39.9241C44.4458 39.8738 44.3355 39.8 44.2427 39.707L35.2927 30.707C35.1053 30.5195 35 30.2653 35 30.0002C35 29.7351 35.1053 29.4808 35.2927 29.2933L38.2927 26.2933C38.3855 26.2003 38.4958 26.1266 38.6172 26.0762C38.7386 26.0259 38.8687 26 39.0002 26C39.1316 26 39.2617 26.0259 39.3831 26.0762C39.5045 26.1266 39.6148 26.2003 39.7077 26.2933L44.2927 30.7083C44.3855 30.8013 44.4958 30.875 44.6172 30.9253C44.7386 30.9757 44.8687 31.0016 45.0002 31.0016C45.1316 31.0016 45.2617 30.9757 45.3831 30.9253C45.5045 30.875 45.6148 30.8013 45.7077 30.7083L57.2927 19.2933C57.3855 19.2003 57.4958 19.1266 57.6172 19.0762C57.7386 19.0259 57.8687 19 58.0002 19C58.1316 19 58.2617 19.0259 58.3831 19.0762C58.5045 19.1266 58.6148 19.2003 58.7077 19.2933L61.7077 22.2433C61.8951 22.4308 62.0003 22.6851 62.0003 22.9502C62.0003 23.2153 61.8951 23.4695 61.7077 23.657Z"
            fill="white"
          />
          <path
            d="M62.4097 21.5298L59.4097 18.5848C59.0349 18.2115 58.5274 18.002 57.9984 18.002C57.4695 18.002 56.962 18.2115 56.5872 18.5848L44.9997 29.9998L44.9859 29.986L40.4059 25.5773C40.0302 25.2054 39.5225 24.9974 38.9938 24.9988C38.4651 25.0002 37.9585 25.2109 37.5847 25.5848L34.5847 28.5848C34.2103 28.9598 34 29.468 34 29.9979C34 30.5278 34.2103 31.036 34.5847 31.411L43.5372 40.411C43.7229 40.5968 43.9434 40.7442 44.1861 40.8447C44.4288 40.9452 44.6889 40.997 44.9516 40.997C45.2143 40.997 45.4744 40.9452 45.717 40.8447C45.9597 40.7442 46.1802 40.5968 46.3659 40.411L62.4159 24.3635C62.6021 24.1773 62.7496 23.9562 62.85 23.7128C62.9505 23.4694 63.0019 23.2086 63.0013 22.9454C63.0007 22.6821 62.9481 22.4215 62.8466 22.1786C62.7451 21.9357 62.5966 21.7152 62.4097 21.5298ZM44.9522 38.9998L35.9997 29.9998L38.9997 26.9998L39.0134 27.0135L43.5934 31.4223C43.968 31.7933 44.4738 32.0014 45.0009 32.0014C45.5281 32.0014 46.0339 31.7933 46.4084 31.4223L58.0072 19.9998L60.9997 22.9498L44.9522 38.9998Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_ddddd_0_1"
              x="0"
              y="0"
              width="96"
              height="135"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_0_1"
                result="effect2_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="15" />
              <feGaussianBlur stdDeviation="7.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.09 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_dropShadow_0_1"
                result="effect3_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="33" />
              <feGaussianBlur stdDeviation="10" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_dropShadow_0_1"
                result="effect4_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="58" />
              <feGaussianBlur stdDeviation="11.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.01 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_dropShadow_0_1"
                result="effect5_dropShadow_0_1"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect5_dropShadow_0_1"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <svg
          width="96"
          height="135"
          viewBox="0 0 96 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_ddddd_0_1)">
            <circle cx="48" cy="29" r="25" fill="black" />
          </g>
          <path
            opacity="0.2"
            d="M61.7077 23.657L45.6577 39.707C45.5648 39.8 45.4545 39.8738 45.3331 39.9241C45.2117 39.9744 45.0816 40.0003 44.9502 40.0003C44.8187 40.0003 44.6886 39.9744 44.5672 39.9241C44.4458 39.8738 44.3355 39.8 44.2427 39.707L35.2927 30.707C35.1053 30.5195 35 30.2653 35 30.0002C35 29.7351 35.1053 29.4808 35.2927 29.2933L38.2927 26.2933C38.3855 26.2003 38.4958 26.1266 38.6172 26.0762C38.7386 26.0259 38.8687 26 39.0002 26C39.1316 26 39.2617 26.0259 39.3831 26.0762C39.5045 26.1266 39.6148 26.2003 39.7077 26.2933L44.2927 30.7083C44.3855 30.8013 44.4958 30.875 44.6172 30.9253C44.7386 30.9757 44.8687 31.0016 45.0002 31.0016C45.1316 31.0016 45.2617 30.9757 45.3831 30.9253C45.5045 30.875 45.6148 30.8013 45.7077 30.7083L57.2927 19.2933C57.3855 19.2003 57.4958 19.1266 57.6172 19.0762C57.7386 19.0259 57.8687 19 58.0002 19C58.1316 19 58.2617 19.0259 58.3831 19.0762C58.5045 19.1266 58.6148 19.2003 58.7077 19.2933L61.7077 22.2433C61.8951 22.4308 62.0003 22.6851 62.0003 22.9502C62.0003 23.2153 61.8951 23.4695 61.7077 23.657Z"
            fill="white"
          />
          <path
            d="M62.4097 21.5298L59.4097 18.5848C59.0349 18.2115 58.5274 18.002 57.9984 18.002C57.4695 18.002 56.962 18.2115 56.5872 18.5848L44.9997 29.9998L44.9859 29.986L40.4059 25.5773C40.0302 25.2054 39.5225 24.9974 38.9938 24.9988C38.4651 25.0002 37.9585 25.2109 37.5847 25.5848L34.5847 28.5848C34.2103 28.9598 34 29.468 34 29.9979C34 30.5278 34.2103 31.036 34.5847 31.411L43.5372 40.411C43.7229 40.5968 43.9434 40.7442 44.1861 40.8447C44.4288 40.9452 44.6889 40.997 44.9516 40.997C45.2143 40.997 45.4744 40.9452 45.717 40.8447C45.9597 40.7442 46.1802 40.5968 46.3659 40.411L62.4159 24.3635C62.6021 24.1773 62.7496 23.9562 62.85 23.7128C62.9505 23.4694 63.0019 23.2086 63.0013 22.9454C63.0007 22.6821 62.9481 22.4215 62.8466 22.1786C62.7451 21.9357 62.5966 21.7152 62.4097 21.5298ZM44.9522 38.9998L35.9997 29.9998L38.9997 26.9998L39.0134 27.0135L43.5934 31.4223C43.968 31.7933 44.4738 32.0014 45.0009 32.0014C45.5281 32.0014 46.0339 31.7933 46.4084 31.4223L58.0072 19.9998L60.9997 22.9498L44.9522 38.9998Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_ddddd_0_1"
              x="0"
              y="0"
              width="96"
              height="135"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_0_1"
                result="effect2_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="15" />
              <feGaussianBlur stdDeviation="7.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.09 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_dropShadow_0_1"
                result="effect3_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="33" />
              <feGaussianBlur stdDeviation="10" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_dropShadow_0_1"
                result="effect4_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="58" />
              <feGaussianBlur stdDeviation="11.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.01 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_dropShadow_0_1"
                result="effect5_dropShadow_0_1"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect5_dropShadow_0_1"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <svg
          width="96"
          height="135"
          viewBox="0 0 96 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_ddddd_55_319)">
            <circle cx="48" cy="29" r="25" fill="white" />
            <circle cx="48" cy="29" r="21" stroke="black" stroke-width="8" />
          </g>
          <defs>
            <filter
              id="filter0_ddddd_55_319"
              x="0"
              y="0"
              width="96"
              height="135"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_55_319"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_55_319"
                result="effect2_dropShadow_55_319"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="15" />
              <feGaussianBlur stdDeviation="7.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.09 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_dropShadow_55_319"
                result="effect3_dropShadow_55_319"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="33" />
              <feGaussianBlur stdDeviation="10" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_dropShadow_55_319"
                result="effect4_dropShadow_55_319"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="58" />
              <feGaussianBlur stdDeviation="11.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0980392 0 0 0 0 0.0980392 0 0 0 0 0.101961 0 0 0 0.01 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_dropShadow_55_319"
                result="effect5_dropShadow_55_319"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect5_dropShadow_55_319"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="rowington">
        <div>Initialized</div>
        <div>Studing Documents</div>
        <div>Completed</div>
      </div>
      <div className="svg-container">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1V5C14 5.26522 13.8946 5.51957 13.7071 5.70711C13.5196 5.89464 13.2652 6 13 6C12.7348 6 12.4804 5.89464 12.2929 5.70711C12.1054 5.51957 12 5.26522 12 5V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1ZM25 12H21C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13C20 13.2652 20.1054 13.5196 20.2929 13.7071C20.4804 13.8946 20.7348 14 21 14H25C25.2652 14 25.5196 13.8946 25.7071 13.7071C25.8946 13.5196 26 13.2652 26 13C26 12.7348 25.8946 12.4804 25.7071 12.2929C25.5196 12.1054 25.2652 12 25 12ZM19.3638 17.95C19.1747 17.7704 18.9229 17.6717 18.6622 17.6751C18.4014 17.6784 18.1523 17.7835 17.9679 17.9679C17.7835 18.1523 17.6784 18.4014 17.6751 18.6622C17.6717 18.9229 17.7704 19.1747 17.95 19.3638L20.7775 22.1925C20.9651 22.3801 21.2196 22.4856 21.485 22.4856C21.7504 22.4856 22.0049 22.3801 22.1925 22.1925C22.3801 22.0049 22.4856 21.7504 22.4856 21.485C22.4856 21.2196 22.3801 20.9651 22.1925 20.7775L19.3638 17.95ZM13 20C12.7348 20 12.4804 20.1054 12.2929 20.2929C12.1054 20.4804 12 20.7348 12 21V25C12 25.2652 12.1054 25.5196 12.2929 25.7071C12.4804 25.8946 12.7348 26 13 26C13.2652 26 13.5196 25.8946 13.7071 25.7071C13.8946 25.5196 14 25.2652 14 25V21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM6.63625 17.95L3.8075 20.7775C3.61986 20.9651 3.51444 21.2196 3.51444 21.485C3.51444 21.7504 3.61986 22.0049 3.8075 22.1925C3.99514 22.3801 4.24964 22.4856 4.515 22.4856C4.78036 22.4856 5.03486 22.3801 5.2225 22.1925L8.05 19.3638C8.22962 19.1747 8.32828 18.9229 8.32494 18.6622C8.3216 18.4014 8.21653 18.1523 8.03213 17.9679C7.84773 17.7835 7.59859 17.6784 7.33782 17.6751C7.07706 17.6717 6.82531 17.7704 6.63625 17.95ZM6 13C6 12.7348 5.89464 12.4804 5.70711 12.2929C5.51957 12.1054 5.26522 12 5 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H5C5.26522 14 5.51957 13.8946 5.70711 13.7071C5.89464 13.5196 6 13.2652 6 13ZM5.2225 3.8075C5.03486 3.61986 4.78036 3.51444 4.515 3.51444C4.24964 3.51444 3.99514 3.61986 3.8075 3.8075C3.61986 3.99514 3.51444 4.24964 3.51444 4.515C3.51444 4.78036 3.61986 5.03486 3.8075 5.2225L6.63625 8.05C6.82531 8.22962 7.07706 8.32828 7.33782 8.32494C7.59859 8.3216 7.84773 8.21653 8.03213 8.03213C8.21653 7.84773 8.3216 7.59859 8.32494 7.33782C8.32828 7.07706 8.22962 6.82531 8.05 6.63625L5.2225 3.8075Z"
            fill="black"
          />
        </svg>
      </div>

      <p>
        Sit tight while our systems analyze your documents and build your custom
        tools
      </p>
      <p>Join Discord for Support</p>
    </div>
  );
}
