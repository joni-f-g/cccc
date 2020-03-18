import React, { useState } from "react";
import { enUS, zhCN, es, pt } from "date-fns/locale";
import Calendar from "./components/Calendar.js";

import Instructions from "./components/Instructions.js";
import FAQ from "./components/FAQ.js";
import Explainer from "./components/Explainer.js";
import SampleForms from "./components/SampleForms.js";
import "./App.css";

const App = () => {
  const [instructions, setInstructions] = useState("Instructions");
  const [faq, setFaq] = useState("FAQ");
  const [explainer, setExplainer] = useState("Explainer");
  const [sampleForms, setSampleForms] = useState("Sample Forms");
  const [currentPage, setCurrentPage] = useState(null);
  const [infoComponent, setInfoComponent] = useState(null);
  const [lang, setLang] = useState(enUS);

  const setPage = (p, language) => {
    if (language) {
      setLang(language);
    }
    switch (p) {
      case "instructions":
        setCurrentPage("instructions");
        setInfoComponent(<Instructions lang={language || lang} />);
        break;
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
        setInstructions("Instrucciones");
        setFaq("Preguntas Frecuentes");
        setExplainer("Explicar");
        setSampleForms("Formulario de muestra");
        break;
      case "zh-CN":
        setInstructions("使用指南");
        setFaq("常见问题答疑");
        setExplainer("背景阐述");
        setSampleForms("表格示例");
        break;
      case "pt":
        setInstructions("Instructions");
        setFaq("FAQ");
        setExplainer("Explainer");
        setSampleForms("Sample Forms");
        break;
      case "de":
        setInstructions("Anleitung");
        setFaq("FAQ");
        setExplainer("Erkärung");
        setSampleForms("Beispiel Form");
        break;
      case "fr":
        setInstructions("Instructions");
        setFaq("Questions Fréquemment Posées");
        setExplainer("Explication");
        setSampleForms("Exemples de Formulaires");
        break;
      case "el":
        setInstructions("Οδηγίες");
        setFaq("FAQ");
        setExplainer("Τι είναι;");
        setSampleForms("Φόρμες - παραδείγματα");
        break;
      default:
        setInstructions("Instructions");
        setFaq("FAQ");
        setExplainer("Explainer");
        setSampleForms("Sample Forms");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">Covid Childcare Co-op Creator</h2>
        <div className="infoButtons">
          {currentPage ? (
            <button onClick={() => setPage(null)}>Home</button>
          ) : (
            <>
              <button onClick={() => setPage("instructions")}>
                {instructions}
              </button>
              <button onClick={() => setPage("faq")}>{faq}</button>
              <button onClick={() => setPage("explainer")}>{explainer}</button>
              <button onClick={() => setPage("sampleforms")}>
                {sampleForms}
              </button>
            </>
          )}
          {` | `}
          <button onClick={() => setPage(currentPage, enUS)}>
            english
          </button> -{" "}
          <button onClick={() => setPage(currentPage, es)}>español</button> -{" "}
          <button onClick={() => setPage(currentPage, zhCN)}>中文</button>
          <button onClick={() => setPage(currentPage, pt)}>português</button>
        </div>
        <div className="info">{infoComponent && infoComponent}</div>
        {!infoComponent && <Calendar locale={lang} />}
      </header>
    </div>
  );
};

export default App;
