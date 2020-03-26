import React, { useState } from "react";
import { de, enUS, zhCN, el, es, fr, pt } from "date-fns/locale";
import Calendar from "./components/Calendar.js";

import FAQ from "./components/FAQ.js";
import Explainer from "./components/Explainer.js";
import SampleForms from "./components/SampleForms.js";
import "./App.css";

const languages = [
  { locale: enUS, text: "English" },
  { locale: es, text: "Español" },
  { locale: zhCN, text: "中文" },
  { locale: pt, text: "Português" },
  { locale: fr, text: "Français" },
  { locale: de, text: "Deutsche" },
  { locale: el, text: "ελληνικά" }
];

const App = () => {
  const [previous, setPrevious] = useState("Back");
  const [faq, setFaq] = useState("FAQ");
  const [explainer, setExplainer] = useState("Explainer");
  const [sampleForms, setSampleForms] = useState("Sample Forms");
  const [currentPage, setCurrentPage] = useState(null);
  const [infoComponent, setInfoComponent] = useState(null);

  const userLang =
    [de, enUS, zhCN, el, es, fr, pt].find(
      lang =>
        lang.code === window.navigator.userLanguage ||
        lang.code === window.navigator.language
    ) || enUS;
  const [lang, setLang] = useState(userLang);

  const setPage = (p, language) => {
    if (language) {
      setLang(language);
    }
    switch (p) {
      case "faq":
        setCurrentPage("faq");
        setInfoComponent(<FAQ lang={language || lang} />);
        break;
      case "explainer":
        setCurrentPage("explainer");
        setInfoComponent(<Explainer lang={language || lang} />);
        break;
      case "sampleforms":
        setCurrentPage("sampleforms");
        setInfoComponent(<SampleForms lang={language || lang} />);
        break;
      default:
        setCurrentPage(null);
        setInfoComponent(null);
    }
    switch (language ? language.code : "en-US") {
      case "es":
        setPrevious("Previo");
        setFaq("Preguntas Frecuentes");
        setExplainer("Explicar");
        setSampleForms("Formulario de muestra");
        break;
      case "zh-CN":
        setPrevious("前");
        setFaq("常见问题答疑");
        setExplainer("背景阐述");
        setSampleForms("表格示例");
        break;
      case "pt":
        setPrevious("Anterior");
        setFaq("Perguntas frequentes");
        setExplainer("Explicação");
        setSampleForms("Exemplos de formulários");
        break;
      case "de":
        setPrevious("Vorheriger");
        setFaq("FAQ");
        setExplainer("Erkärung");
        setSampleForms("Beispiel Form");
        break;
      case "fr":
        setPrevious("Précédente");
        setFaq("Questions Fréquemment Posées");
        setExplainer("Explication");
        setSampleForms("Exemples de Formulaires");
        break;
      case "el":
        setPrevious("Προηγούμενο");
        setFaq("FAQ");
        setExplainer("Τι είναι;");
        setSampleForms("Φόρμες - παραδείγματα");
        break;
      default:
        setPrevious("Back");
        setFaq("FAQ");
        setExplainer("Explainer");
        setSampleForms("Sample Forms");
    }
  };

  return (
    <>
      <div className="Navigation row">
        <div className="col-xs-12 w-100">
          <div className="row">
            <div
              className="title"
              role="button"
              tabIndex="0"
              onClick={() => setPage(null)}
            >
              CC<br style={{ lineHeight: "0px" }} />CC
            </div>&nbsp;<div style={{ lineHeight: "18px" }}>
              Covid Childcare<br />Co-op Calendar
            </div>
            <div id="languages" className="ml-auto dropdown">
              <a
                className="dropdown-toggle language"
                href="#"
                role="button"
                id="languagesDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select Language
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {languages.map(l => (
                  <a
                    key={l.text}
                    className="dropdown-item"
                    onClick={() => setPage(currentPage, l.locale)}
                  >
                    {l.text}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="headerLinks"
              role="button"
              tabIndex="0"
              onClick={() => setPage("explainer")}
            >
              {explainer}
            </div>
            <div
              className="headerLinks"
              tabIndex="0"
              onClick={() => setPage("sampleforms")}
            >
              {sampleForms}
            </div>
            <div
              className="headerLinks"
              tabIndex="0"
              onClick={() => setPage("faq")}
            >
              {faq}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="info">
          {infoComponent && (
            <>
              <div
                className="back text-btn"
                role="button"
                tabIndex="0"
                onClick={() => setPage(null)}
              >
                <i className="fas fa-long-arrow-alt-left" />
                {" " + previous}
              </div>
              <div>{infoComponent}</div>
            </>
          )}
        </div>
        <div className={infoComponent ? "hideCalendar" : "showCalendar"}>
          <Calendar locale={lang} />
        </div>
      </div>
    </>
  );
};

export default App;
