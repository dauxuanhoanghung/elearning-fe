// @ts-nocheck
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([
    { title: t("faq.question1"), answer: t("faq.answer1") },
    { title: t("faq.question2"), answer: t("faq.answer2") },
    { title: t("faq.question3"), answer: t("faq.answer3") },
  ]);

  return (
    <main className="w-full md:container">
      <h1>{t("faq.title")}</h1>
      <Accordion>
        {questions.map((question, index) => (
          <AccordionItem key={index} title={question.title}>
            <AccordionTrigger>{question.title}</AccordionTrigger>
            <AccordionContent>
              <p>{question.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default FAQPage;
