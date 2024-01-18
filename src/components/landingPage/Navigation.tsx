import React from "react";
export default function Navigation() {
  return (
    <React.Fragment>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12 lg:px-16">
          <div
            x-data="{ open: false }"
            className="relative mx-auto flex w-full flex-col bg-white py-5 md:flex-row md:items-center md:justify-between md:px-6"
          >
            <div className="flex flex-row items-center justify-between lg:justify-start">
              <a
                href="/"
                className=" inline-flex items-center gap-3 text-black"
              >
                <svg
                  width="50"
                  height="49"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_110_851)">
                    <path
                      d="M2 10.66C2 7.24306 2 5.53458 2.67552 4.23415C3.24477 3.13829 4.13829 2.24477 5.23415 1.67552C6.53458 1 8.24306 1 11.66 1H18.34C21.7569 1 23.4654 1 24.7658 1.67552C25.8617 2.24477 26.7552 3.13829 27.3245 4.23415C28 5.53458 28 7.24306 28 10.66V17.34C28 20.7569 28 22.4654 27.3245 23.7658C26.7552 24.8617 25.8617 25.7552 24.7658 26.3245C23.4654 27 21.7569 27 18.34 27H11.66C8.24306 27 6.53458 27 5.23415 26.3245C4.13829 25.7552 3.24477 24.8617 2.67552 23.7658C2 22.4654 2 20.7569 2 17.34V10.66Z"
                      fill="white"
                    ></path>
                  </g>
                  <mask
                    id="mask0_110_851"
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="1"
                    width="26"
                    height="26"
                  >
                    <rect
                      x="2"
                      y="1"
                      width="26"
                      height="26"
                      rx="6"
                      fill="white"
                    ></rect>
                  </mask>
                  <g mask="url(#mask0_110_851)">
                    <rect
                      width="32"
                      height="32"
                      transform="translate(-1 -2)"
                      fill="white"
                    ></rect>
                    <g filter="url(#filter1_ddddd_110_851)">
                      <path
                        d="M6.90966 21L12.8723 4.85121H17.683L23.6683 21H18.6542L17.8637 18.6285H12.398L11.6075 21H6.90966ZM14.521 12.2142L13.4595 15.3762H16.8022L15.7858 12.2142L15.176 10.1363H15.1309C14.905 10.9945 14.7017 11.6872 14.521 12.2142Z"
                        fill="#141521"
                      ></path>
                      <path
                        d="M6.90966 21L6.48964 20.8449L6.26706 21.4477H6.90966V21ZM12.8723 4.85121V4.40348H12.5603L12.4523 4.69613L12.8723 4.85121ZM17.683 4.85121L18.1029 4.69561L17.9946 4.40348H17.683V4.85121ZM23.6683 21V21.4477H24.3117L24.0881 20.8444L23.6683 21ZM18.6542 21L18.2295 21.1416L18.3315 21.4477H18.6542V21ZM17.8637 18.6285L18.2885 18.4869L18.1864 18.1808H17.8637V18.6285ZM12.398 18.6285V18.1808H12.0753L11.9732 18.4869L12.398 18.6285ZM11.6075 21V21.4477H11.9302L12.0322 21.1416L11.6075 21ZM14.521 12.2142L14.0975 12.0689L14.0966 12.0717L14.521 12.2142ZM13.4595 15.3762L13.0351 15.2337L12.8369 15.8239H13.4595V15.3762ZM16.8022 15.3762V15.8239H17.4164L17.2285 15.2391L16.8022 15.3762ZM15.7858 12.2142L15.3561 12.3403L15.3596 12.3512L15.7858 12.2142ZM15.176 10.1363L15.6056 10.0102L15.5112 9.68853H15.176V10.1363ZM15.1309 10.1363V9.68853H14.7857L14.6979 10.0223L15.1309 10.1363ZM7.32968 21.1551L13.2923 5.0063L12.4523 4.69613L6.48964 20.8449L7.32968 21.1551ZM12.8723 5.29895H17.683V4.40348H12.8723V5.29895ZM17.2632 5.00681L23.2484 21.1556L24.0881 20.8444L18.1029 4.69561L17.2632 5.00681ZM23.6683 20.5523H18.6542V21.4477H23.6683V20.5523ZM19.079 20.8584L18.2885 18.4869L17.439 18.7701L18.2295 21.1416L19.079 20.8584ZM17.8637 18.1808H12.398V19.0762H17.8637V18.1808ZM11.9732 18.4869L11.1827 20.8584L12.0322 21.1416L12.8227 18.7701L11.9732 18.4869ZM11.6075 20.5523H6.90966V21.4477H11.6075V20.5523ZM14.0966 12.0717L13.0351 15.2337L13.884 15.5187L14.9455 12.3567L14.0966 12.0717ZM13.4595 15.8239H16.8022V14.9284H13.4595V15.8239ZM17.2285 15.2391L16.2121 12.0771L15.3596 12.3512L16.3759 15.5132L17.2285 15.2391ZM16.2155 12.0881L15.6056 10.0102L14.7464 10.2624L15.3562 12.3402L16.2155 12.0881ZM15.176 9.68853H15.1309V10.584H15.176V9.68853ZM14.6979 10.0223C14.4734 10.8754 14.2732 11.5564 14.0975 12.0689L14.9446 12.3594C15.1302 11.8179 15.3366 11.1136 15.5639 10.2502L14.6979 10.0223Z"
                        fill="#141521"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_110_851"
                      x="0.75"
                      y="0.25"
                      width="28.5"
                      height="28.5"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="0.5"></feOffset>
                      <feGaussianBlur stdDeviation="0.625"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_110_851"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_110_851"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter1_ddddd_110_851"
                      x="0.882976"
                      y="4.85121"
                      width="28.812"
                      height="28.2021"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="0.376667"></feOffset>
                      <feGaussianBlur stdDeviation="0.188334"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_110_851"
                      ></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="0.753335"></feOffset>
                      <feGaussianBlur stdDeviation="0.376667"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow_110_851"
                        result="effect2_dropShadow_110_851"
                      ></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="1.50667"></feOffset>
                      <feGaussianBlur stdDeviation="0.753335"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="effect2_dropShadow_110_851"
                        result="effect3_dropShadow_110_851"
                      ></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="3.01334"></feOffset>
                      <feGaussianBlur stdDeviation="1.50667"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="effect3_dropShadow_110_851"
                        result="effect4_dropShadow_110_851"
                      ></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="6.02668"></feOffset>
                      <feGaussianBlur stdDeviation="3.01334"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="effect4_dropShadow_110_851"
                        result="effect5_dropShadow_110_851"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect5_dropShadow_110_851"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
                <span className="font-display font-bold">AstroSaas</span>
              </a>
              <button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:text-black focus:outline-none lg:hidden">
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="{'hidden': open, 'inline-flex': !open }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                  <path
                    className="{'hidden': !open, 'inline-flex': open }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <nav className="hidden flex-grow flex-col items-center md:flex md:flex-row md:justify-end md:pb-0">
              <a
                className="hover:text-accent-400 px-2 py-2 text-sm font-medium text-black md:px-3 lg:ml-auto lg:px-6"
                href="/#features"
              >
                Features
              </a>
              <a
                className="hover:text-accent-400 px-2 py-2 text-sm font-medium text-black md:px-3 lg:px-6"
                href="/#pricing"
              >
                Pricing
              </a>

              <a
                className="hover:text-accent-400 px-2 py-2 text-sm font-medium text-black md:px-3 lg:px-6"
                href="/faq"
              >
                Faq
              </a>

              <div className="inline-flex list-none items-center gap-2 lg:ml-auto">
                <a
                  href="/signup"
                  className="hover:text-accent-400 focus:shadow-outline mt-2 block px-4 py-2 text-sm font-medium text-black focus:outline-none md:mt-0"
                >
                  Sign up
                </a>
                <a
                  href="/login"
                  className="active:text-accent-400 group inline-flex h-8 items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:bg-gray-200"
                >
                  Log in
                </a>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
