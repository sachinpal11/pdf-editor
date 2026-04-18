import GradientText from "../ui/GradientText";

export default function HeroHeadline() {
  return (
    <h1 className="animate-fade-up delay-120 text-white font-medium leading-[1.08] tracking-[-0.03em] mb-5 text-[clamp(34px,5.5vw,60px)]">
      Convert &amp; Edit
      <GradientText> PDFs</GradientText> Anywhere, Instantly.
    </h1>
  );
}
