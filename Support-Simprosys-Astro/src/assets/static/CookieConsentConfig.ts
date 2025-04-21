import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom left",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4 (dummy)</a>',
          onAccept: () => {
            // console.log("ga4 accepted");
            // TODO: load ga4
          },
          onReject: () => {
            console.log("ga4 rejected");
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
        another: {
          label: "Another one (dummy)",
        },
      },
    },
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description: `Our website uses cookies to ensure you get the best experience on our website. Details can be found in our <a href="https://simprosys.com/privacy-policy">Privacy Policy</a>`,
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          // footer:
          //   '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
        },
        preferencesModal: {
          title:
            "<div class='b-tl' role='heading' aria-level='3'>Cookie Settings</div>",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Customize Consent Preferences",
              description: `
              <p>We use cookies to help you navigate efficiently and perform certain functions. 
              You will find detailed information about all cookies under each consent category below.</p><br><br>

              <p>We also use third-party cookies that help us analyze how you use this website 
              and store your preferences.</p><br><br>

              <p>These cookies will only be stored in your browser with your prior consent.</p><br><br>

              <p>You can choose to enable or disable some or all of these cookies, 
              but disabling some of them may affect your browsing experience.</p>
            `,
            },

            // {
            //   title:
            //     'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
            //   description:
            //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            //   linkedCategory: "necessary",
            // },
            {
              title: "Analytics Cookies",
              description: `
              <div class="p">Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.</div><br /><br />
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cookie</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-column="Cookie">_ga</td>
                    <td data-column="Duration">2 years</td>
                    <td data-column="Description">
                      The _ga cookie, installed by Google Analytics, calculates visitor, session, campaign data, 
                      and also keeps track of site usage for the site's analytics report. The cookie stores 
                      information anonymously and assigns a randomly generated number to recognize unique visitors.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">_gid</td>
                    <td data-column="Duration">1 day</td>
                    <td data-column="Description">
                      Installed by Google Analytics, _gid cookie stores information on how visitors use a website, 
                      while also creating an analytics report of the website's performance. Some of the data 
                      that are collected include the number of visitors, their source, and the pages they visit anonymously.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">_gat</td>
                    <td data-column="Duration">1 minute</td>
                    <td data-column="Description">
                      This cookie is installed by Google Universal Analytics to restrain the request rate 
                      and thus limit the collection of data on high-traffic sites.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">CONSENT</td>
                    <td data-column="Duration">2 years</td>
                    <td data-column="Description">
                      YouTube sets this cookie via embedded YouTube videos and registers anonymous statistical data.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">instap-spses.6a48</td>
                    <td data-column="Duration">30 minutes</td>
                    <td data-column="Description">
                      This cookie is used by Instapages to track unique visitors.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">instap-spid.6a48</td>
                    <td data-column="Duration">2 years</td>
                    <td data-column="Description">
                      This cookie is used by Instapages to track unique visitors.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">_gcl_au</td>
                    <td data-column="Duration">3 months</td>
                    <td data-column="Description">
                      Provided by Google Tag Manager to experiment with advertisement efficiency of websites using their services.
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Cookie">_gat_gtag_UA_144842869_1</td>
                    <td data-column="Duration">1 minute</td>
                    <td data-column="Description">
                      Set by Google to distinguish users.
                    </td>
                  </tr>
                </tbody>
              </table>
            `,
              linkedCategory: "functionality",
            },
            {
              title: "Advertisement",
              description:
                '<div class="desc b-acc" id="c-ac-2" aria-hidden="false"><table><thead><tr><th scope="col">Cookie </th><th scope="col">Duration </th><th scope="col">Description </th></tr></thead><tbody><tr><td data-column="Cookie ">_fbp</td><td data-column="Duration "> 3 months</td><td data-column="Description "> Facebook sets this cookie to display advertisements when the user is either on Facebook or on a digital platform powered by Facebook advertising, after visiting the website.</td></tr><tr><td data-column="Cookie ">fr</td><td data-column="Duration ">3 months</td><td data-column="Description ">Facebook sets this cookie to show relevant advertisements to users by tracking user behavior across the web, on sites that have Facebook pixel or Facebook social plugin.</td></tr><tr><td data-column="Cookie ">YSC</td><td data-column="Duration ">session</td><td data-column="Description ">YSC cookie is set by Youtube and is used to track the views of embedded videos on Youtube pages.</td></tr><tr><td data-column="Cookie ">VISITOR_INFO1_LIVE</td><td data-column="Duration "> 5 months 27 days</td><td data-column="Description ">  A cookie set by YouTube to measure bandwidth that determines whether the user gets the new or old player interface.</td></tr><tr><td data-column="Cookie "> yt-remote-device-id</td><td data-column="Duration ">never</td><td data-column="Description ">  YouTube sets this cookie to store the video preferences of the user using embedded YouTube video.</td></tr><tr><td data-column="Cookie ">  yt-remote-connected-devices</td><td data-column="Duration "> never</td><td data-column="Description "> YouTube sets this cookie to store the video preferences of the user using embedded YouTube video.</td></tr></tbody></table></div>',
              linkedCategory: "functionality",
            },
            // {
            //   title: "More information",
            //   description:
            //     'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            // },
          ],
        },
      },
    },
  },
};
