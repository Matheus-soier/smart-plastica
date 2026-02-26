"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Option = {
  value: string;
  label: string;
  points?: number;
};

type TextStep = {
  kind: "text";
  id: "nome" | "telefone" | "email";
  question: string;
  helper: string;
  placeholder: string;
  optional?: boolean;
  type?: "text" | "email";
};

type ChoiceStep = {
  kind: "choice";
  id: string;
  question: string;
  helper: string;
  options: Option[];
  scored?: boolean;
};

type Step = TextStep | ChoiceStep;

type ScoreResult = {
  raw: number;
  percent: number;
  priority: "ALTA" | "MEDIA" | "NUTRICAO";
};

const steps: Step[] = [
  {
    kind: "text",
    id: "nome",
    question: "Como você gostaria de ser chamada?",
    helper: "Assim personalizamos seu atendimento desde o primeiro contato.",
    placeholder: "Digite seu nome",
  },
  {
    kind: "text",
    id: "telefone",
    question: "Qual seu melhor WhatsApp para contato?",
    helper: "Usaremos este número para te retornar com orientações iniciais.",
    placeholder: "(11) 99999-9999",
  },
  {
    kind: "text",
    id: "email",
    question: "Se preferir, informe também seu e-mail.",
    helper: "Opcional. Enviamos somente informações do seu atendimento.",
    placeholder: "voce@email.com",
    optional: true,
    type: "email",
  },
  {
    kind: "choice",
    id: "objetivo_lipo",
    question: "Na Lipo HD, qual resultado você mais busca agora?",
    helper: "Isso ajuda a equipe a entender o desenho corporal que você deseja.",
    scored: true,
    options: [
      {
        value: "definicao_natural",
        label: "Definição do abdome e cintura com naturalidade",
        points: 10,
      },
      {
        value: "contorno_corporal",
        label: "Reduzir gordura localizada e melhorar contorno corporal",
        points: 8,
      },
      {
        value: "definicao_marcada",
        label: "Definição mais marcada (abdome mais atlético)",
        points: 12,
      },
    ],
  },
  {
    kind: "choice",
    id: "regiao_principal",
    question: "Qual região você quer priorizar na Lipo HD?",
    helper: "Assim direcionamos melhor sua avaliação inicial.",
    scored: true,
    options: [
      { value: "abdome_flancos", label: "Abdome e flancos", points: 12 },
      { value: "cintura_costas", label: "Cintura e costas", points: 10 },
      { value: "multiplas_regioes", label: "Quero avaliar mais de uma região", points: 8 },
    ],
  },
  {
    kind: "choice",
    id: "peso_estavel",
    question: "Seu peso está estável nos últimos meses?",
    helper: "Esse é um dado importante para indicação e planejamento da Lipo HD.",
    scored: true,
    options: [
      { value: "estavel", label: "Sim, estável", points: 12 },
      { value: "pequena_variacao", label: "Teve pequenas variações", points: 8 },
      { value: "oscilando", label: "Ainda está oscilando bastante", points: 4 },
    ],
  },
  {
    kind: "choice",
    id: "prazo",
    question: "Em quanto tempo você gostaria de avançar com a Lipo HD?",
    helper: "Isso organiza melhor prioridade e disponibilidade da agenda.",
    scored: true,
    options: [
      { value: "30", label: "Nos próximos 30 dias", points: 14 },
      { value: "90", label: "Entre 30 e 90 dias", points: 10 },
      { value: "sem_prazo", label: "Ainda sem prazo definido", points: 5 },
    ],
  },
  {
    kind: "choice",
    id: "orcamento",
    question: "Como está seu planejamento de investimento hoje?",
    helper: "Isso nos ajuda a sugerir o caminho mais viável para você.",
    scored: true,
    options: [
      { value: "planejado", label: "Já tenho planejamento definido", points: 14 },
      { value: "organizando", label: "Estou organizando agora", points: 9 },
      { value: "indefinido", label: "Ainda sem previsão", points: 3 },
    ],
  },
  {
    kind: "choice",
    id: "unidade",
    question: "Qual unidade faz mais sentido para seu atendimento?",
    helper: "Assim você já fala com a equipe da praça certa.",
    scored: true,
    options: [
      { value: "São Paulo (Moema)", label: "São Paulo (Moema)", points: 8 },
      { value: "Pelotas (RS)", label: "Pelotas (RS)", points: 8 },
      { value: "nao_definiu", label: "Ainda não defini", points: 5 },
    ],
  },
  {
    kind: "choice",
    id: "distancia",
    question: "Você está próxima(o) da unidade escolhida?",
    helper: "Isso ajuda no planejamento do deslocamento para avaliação e retorno.",
    scored: true,
    options: [
      { value: "mesma_cidade", label: "Moro na mesma cidade", points: 10 },
      { value: "ate_100", label: "Consigo ir com deslocamento curto", points: 8 },
      { value: "longe", label: "Preciso organizar viagem", points: 4 },
    ],
  },
  {
    kind: "choice",
    id: "disponibilidade",
    question: "Como está sua disponibilidade para avaliação presencial?",
    helper: "Com isso conseguimos sugerir janelas de agenda compatíveis.",
    scored: true,
    options: [
      { value: "imediata", label: "Tenho horário nesta/na próxima semana", points: 10 },
      { value: "curto_prazo", label: "Consigo nas próximas semanas", points: 7 },
      { value: "sem_previsao", label: "Ainda sem previsão", points: 3 },
    ],
  },
  {
    kind: "choice",
    id: "apoio",
    question: "Você já conta com rede de apoio para o pós-operatório?",
    helper: "É um ponto importante para uma recuperação tranquila.",
    scored: true,
    options: [
      { value: "sim", label: "Sim, já tenho apoio definido", points: 10 },
      { value: "parcial", label: "Parcial, ainda ajustando", points: 6 },
      { value: "nao", label: "Ainda não tenho apoio", points: 2 },
    ],
  },
  {
    kind: "choice",
    id: "prontidao",
    question: "Neste momento, qual próximo passo você prefere para sua Lipo HD?",
    helper: "Essa resposta direciona o tipo de orientação no WhatsApp.",
    scored: true,
    options: [
      { value: "agendar", label: "Quero agendar minha avaliação", points: 12 },
      { value: "falar", label: "Quero conversar com especialista", points: 8 },
      { value: "avaliar", label: "Prefiro entender mais antes", points: 3 },
    ],
  },
];

const progressCurve = [18, 34, 48, 60, 68, 74, 79, 84, 88, 91, 94, 96, 98, 100];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getPriority(percent: number): ScoreResult {
  if (percent >= 75) {
    return {
      raw: 0,
      percent,
      priority: "ALTA",
    };
  }

  if (percent >= 55) {
    return {
      raw: 0,
      percent,
      priority: "MEDIA",
    };
  }

  return {
    raw: 0,
    percent,
    priority: "NUTRICAO",
  };
}

function getChoiceLabel(stepId: string, selectedValue: string | undefined) {
  const step = steps.find((item): item is ChoiceStep => item.kind === "choice" && item.id === stepId);
  if (!step || !selectedValue) return "Não informado";
  return step.options.find((option) => option.value === selectedValue)?.label ?? "Não informado";
}

type QualificationFunnelProps = {
  whatsappNumber?: string;
};

export function QualificationFunnel({
  whatsappNumber = "5511910136326",
}: QualificationFunnelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = steps[currentIndex];

  const scoredSteps = useMemo(
    () =>
      steps.filter(
        (step): step is ChoiceStep => step.kind === "choice" && Boolean(step.scored),
      ),
    [],
  );

  const maxScore = useMemo(
    () =>
      scoredSteps.reduce(
        (total, step) => total + Math.max(...step.options.map((option) => option.points ?? 0)),
        0,
      ),
    [scoredSteps],
  );

  const score = useMemo(() => {
    const raw = scoredSteps.reduce((total, step) => {
      const selected = values[step.id];
      const option = step.options.find((item) => item.value === selected);
      return total + (option?.points ?? 0);
    }, 0);

    const percent = maxScore > 0 ? Math.round((raw / maxScore) * 100) : 0;
    const priority = getPriority(percent);

    return {
      ...priority,
      raw,
    };
  }, [maxScore, scoredSteps, values]);

  const progress = isSubmitting
    ? 100
    : progressCurve[Math.min(currentIndex, progressCurve.length - 2)] ?? 18;

  const goBack = () => {
    setError("");
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const validateCurrentText = () => {
    if (!currentStep || currentStep.kind !== "text") return false;
    const value = (values[currentStep.id] ?? "").trim();

    if (!currentStep.optional && !value) {
      setError("Preencha este campo para continuar.");
      return false;
    }

    if (currentStep.id === "nome" && value.length > 0 && value.length < 3) {
      setError("Digite um nome válido.");
      return false;
    }

    if (currentStep.id === "telefone") {
      const digitsLength = value.replace(/\D/g, "").length;
      if (digitsLength < 10 || digitsLength > 11) {
        setError("Digite um WhatsApp válido com DDD.");
        return false;
      }
    }

    if (currentStep.id === "email" && value) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValid) {
        setError("Digite um e-mail válido ou deixe este campo em branco.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const goNextTextStep = () => {
    if (!validateCurrentText()) return;
    setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const finalizeToWhatsApp = (nextValues: Record<string, string>) => {
    const cleanPhone = nextValues.telefone?.replace(/\D/g, "") ?? "";
    const messageLines = [
      "Olá! Acabei de preencher meu atendimento no site da Smart Plástica.",
      `Nome: ${nextValues.nome ?? "-"}`,
      `Telefone: ${nextValues.telefone ?? "-"}`,
      `E-mail: ${nextValues.email || "Não informado"}`,
      "Procedimento: Lipo HD",
      `Objetivo principal: ${getChoiceLabel("objetivo_lipo", nextValues.objetivo_lipo)}`,
      `Região prioritária: ${getChoiceLabel("regiao_principal", nextValues.regiao_principal)}`,
      `Peso nos últimos meses: ${getChoiceLabel("peso_estavel", nextValues.peso_estavel)}`,
      `Unidade desejada: ${getChoiceLabel("unidade", nextValues.unidade)}`,
      `Prazo: ${getChoiceLabel("prazo", nextValues.prazo)}`,
      `Planejamento de investimento: ${getChoiceLabel("orcamento", nextValues.orcamento)}`,
      "",
      "Gostaria de seguir com as próximas orientações para minha avaliação.",
    ];

    const message = messageLines.join("\n");
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "smart_internal_triage",
        JSON.stringify({
          score: score.percent,
          priority: score.priority,
          createdAt: new Date().toISOString(),
          answers: nextValues,
        }),
      );

      const dataLayerWindow = window as Window & {
        dataLayer?: Array<Record<string, unknown>>;
      };
      dataLayerWindow.dataLayer?.push({
        event: "smart_triage_completed",
        lead_score: score.percent,
        lead_priority: score.priority,
        procedure: "Lipo HD",
        lipo_goal: nextValues.objetivo_lipo ?? "nao_informado",
        lipo_target_area: nextValues.regiao_principal ?? "nao_informado",
        weight_stability: nextValues.peso_estavel ?? "nao_informado",
        unit: nextValues.unidade ?? "nao_definiu",
        has_email: Boolean(nextValues.email),
        has_valid_phone: cleanPhone.length >= 10,
      });

      setIsSubmitting(true);
      window.setTimeout(() => {
        window.location.assign(url);
      }, 450);
    }
  };

  const handleChoiceSelect = (step: ChoiceStep, selectedValue: string) => {
    const nextValues = { ...values, [step.id]: selectedValue };
    setValues(nextValues);
    setError("");

    if (currentIndex === steps.length - 1) {
      finalizeToWhatsApp(nextValues);
      return;
    }

    window.setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 120);
  };

  return (
    <div className="space-y-2.5 px-4 pb-4 pt-8 md:space-y-3 md:px-5 md:pb-5 md:pt-8">
      <div className="space-y-1">
        <div className="h-1.5 rounded-full bg-[#ead7c9]">
          <div
            className="h-1.5 rounded-full bg-[#a74e31] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[0.68rem] text-[#7f6152] md:text-[0.72rem]">
          <p>Leva cerca de 2 minutos.</p>
          <p>Retorno em at&eacute; 5 minutos.</p>
        </div>
      </div>

      {isSubmitting ? (
        <Card className="rounded-2xl border-[#d9baa6] bg-white">
          <CardHeader className="p-4 pb-3 md:p-5 md:pb-4">
            <CardTitle className="font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-tight text-[#5b2c1e] md:text-[2rem]">
              Tudo pronto.
            </CardTitle>
            <CardDescription>
              Estamos te levando para o WhatsApp da equipe Smart para continuar seu atendimento.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2.5 p-4 pt-1 text-[#6f5144] md:p-5 md:pt-1">
            <Loader2 className="h-5 w-5 animate-spin text-[#a74e31]" />
            <p>Abrindo WhatsApp...</p>
          </CardContent>
        </Card>
      ) : currentStep.kind === "text" ? (
        <Card className="rounded-2xl border-[#d9baa6] bg-white">
          <CardHeader className="space-y-1.5 p-4 pb-3 md:space-y-2 md:p-5 md:pb-4">
            <CardTitle className="font-display text-[clamp(1.45rem,5vw,1.9rem)] leading-[1.08] text-[#5b2c1e] md:text-[2.15rem]">
              {currentStep.question}
            </CardTitle>
            <CardDescription className="text-sm text-[#6f5144] md:text-base">
              {currentStep.helper}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2.5 p-4 pt-1 md:space-y-3 md:p-5 md:pt-1">
            <div className="space-y-2">
              <Label htmlFor={currentStep.id}>
                {currentStep.id === "nome"
                  ? "Nome"
                  : currentStep.id === "telefone"
                    ? "WhatsApp"
                    : "E-mail (opcional)"}
              </Label>
              <Input
                id={currentStep.id}
                className="h-10 text-[0.98rem]"
                type={currentStep.type ?? "text"}
                inputMode={currentStep.id === "telefone" ? "numeric" : undefined}
                placeholder={currentStep.placeholder}
                value={values[currentStep.id] ?? ""}
                onChange={(event) => {
                  const nextValue =
                    currentStep.id === "telefone"
                      ? formatPhone(event.target.value)
                      : event.target.value;
                  setValues((prev) => ({ ...prev, [currentStep.id]: nextValue }));
                  if (error) setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    goNextTextStep();
                  }
                }}
                aria-invalid={Boolean(error)}
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {currentIndex > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border-[#a74e31] text-[#7d412d]"
                  onClick={goBack}
                >
                  Voltar
                </Button>
              ) : null}
              <Button
                type="button"
                className="h-10 bg-[#a74e31] text-white hover:bg-[#8f4229]"
                onClick={goNextTextStep}
              >
                {currentStep.optional && !(values[currentStep.id] ?? "").trim()
                  ? "Continuar sem e-mail"
                  : "Continuar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl border-[#d9baa6] bg-white">
          <CardHeader className="space-y-1.5 p-4 pb-3 md:space-y-2 md:p-5 md:pb-4">
            <CardTitle className="font-display text-[clamp(1.45rem,5vw,1.9rem)] leading-[1.08] text-[#5b2c1e] md:text-[2.15rem]">
              {currentStep.question}
            </CardTitle>
            <CardDescription className="text-sm text-[#6f5144] md:text-base">
              {currentStep.helper}
              <span className="mt-1 block text-[0.72rem] text-[#8b6c5d] md:text-xs">
                Toque em uma opção para continuar automaticamente.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-4 pt-1 md:space-y-2.5 md:p-5 md:pt-1">
            {currentStep.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChoiceSelect(currentStep, option.value)}
                className="w-full rounded-lg border border-[#e5c9b8] bg-[#fffdfb] px-3.5 py-2 text-left text-[0.97rem] leading-snug text-[#5b2c1e] transition hover:border-[#b57a5f] hover:bg-[#f9efe6] md:px-4 md:py-2.5 md:text-[1.03rem]"
              >
                {option.label}
              </button>
            ))}

            {currentIndex > 0 ? (
              <Button
                type="button"
                variant="ghost"
                className="mt-1 h-9 self-start text-[#7d412d]"
                onClick={goBack}
              >
                Voltar
              </Button>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
