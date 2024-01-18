import React from "react";

export default function Hero() {
    return (
      <React.Fragment>
        <section>
          <div className="mx-auto w-full max-w-7xl items-center px-8 py-24 md:px-12 lg:px-24">
            <div>
              <div className="mx-auto max-w-4xl text-center">
                <div className="sm:flex sm:justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    <a
                      href="https://lexingtonthemes.com/free-templates/"
                      className="font-semibold text-indigo-600"
                    >
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <span className="block lg:inline">
                        More free & Premium templates{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </a>
                  </div>
                </div>
                <p className="mt-8 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
                  A starter template built with Astro and Tailwind CSS for your
                  next project
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 lg:text-xl">
                  Putting together a directory website was a challenge.
                  Superstash lets you focus on the content and makes the entire
                  process effortless.
                </p>
              </div>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border px-6 py-3 text-center font-medium text-black text-black/80 duration-200 focus:outline-none focus-visible:outline-black lg:w-auto"
                  href="https://github.com/michael-andreuzza/astrosaas"
                >
                  GitHub
                </a>
                <a
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border-2 border-black bg-black px-6 py-3 text-center font-medium text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
                  href="https://lexingtonthemes.com"
                >
                  Lexington Themes &nbsp; &rarr;
                </a>
              </div>
              <dl className="mx-auto mt-8 max-w-4xl items-start space-y-6 text-center text-sm sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                <div className="text-gray-500">
                  <strong className="text-gray-700">
                    Astro, Tailwind CSS and Alpine.js
                  </strong>{" "}
                  ━ This are the popular technologies behind Astrosaas.
                </div>
                <div className="text-gray-500">
                  <strong className="text-gray-700">Includes 6 pages</strong> ━ You
                  will find this landing, faq, terms,privacy,sign up and sign in
                  pages.
                </div>
                <div className="text-gray-500">
                  <strong className="text-gray-700">Different section</strong> ━ The
                  starter includes different feature sections, a pricing table,
                  testmionial, CTA and full forms. more.
                </div>
              </dl>
            </div>
            <div className="relative mx-auto w-full max-w-7xl items-center py-12 pb-12">
              <div className="rounded-3xl bg-gray-100 p-8" >
                <img
                  alt=""
                  className="relative w-full rounded border object-cover shadow-2xl lg:rounded-2xl"
                  src="https://brightlight.lexingtonthemes.com/assets/dashboard.svg"
                />
              </div>
            </div>
            </div>
        </section>
      </React.Fragment>
    );
}