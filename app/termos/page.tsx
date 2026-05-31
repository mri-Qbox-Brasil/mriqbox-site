import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Termos de Uso — MRI Qbox Brasil",
  description:
    "Termos de uso do site mriqbox.com.br, dos códigos open source publicados nos repositórios da MRI Qbox Brasil e do servidor Discord da comunidade.",
  alternates: { canonical: "/termos" },
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">Termos de Uso</h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: maio de 2026</p>

          <section className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ao acessar <code className="text-primary">mriqbox.com.br</code> e seus subdomínios, ou ao usar
              qualquer código publicado nos repositórios da MRI Qbox Brasil no GitHub, você concorda com
              estes termos. Se discordar, não use o site nem os scripts.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">1. O que oferecemos</h2>
            <p>
              A MRI Qbox Brasil distribui gratuitamente uma adaptação da framework open source{" "}
              <a
                href="https://github.com/Qbox-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Qbox
              </a>{" "}
              (Qbcore + Ox) para servidores FiveM brasileiros. O código é hospedado em{" "}
              <a
                href="https://github.com/mri-Qbox-Brasil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/mri-Qbox-Brasil
              </a>{" "}
              e licenciado sob <strong className="text-foreground">MIT License</strong>, salvo quando
              especificado o contrário em um repositório específico.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">2. Uso permitido</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Usar os scripts em servidores FiveM, comerciais ou não</li>
              <li>Modificar, redistribuir e contribuir de volta via Pull Request</li>
              <li>Forkar repositórios respeitando os termos da licença MIT</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">3. Uso proibido</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Revender o código como serviço pago se passando pela MRI Qbox Brasil ou seus mantenedores
              </li>
              <li>
                Usar a marca &ldquo;MRI Qbox&rdquo;, logos e identidade visual sem autorização (a licença MIT cobre o
                código, não a marca)
              </li>
              <li>
                Atacar a infraestrutura do site (scraping abusivo, DDoS, exploração de vulnerabilidades sem
                disclosure responsável)
              </li>
              <li>Usar conteúdo do site para treinar modelos de IA comerciais sem permissão</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">4. Sem garantias</h2>
            <p>
              Os scripts são fornecidos <strong className="text-foreground">&ldquo;COMO ESTÃO&rdquo;</strong>, sem
              garantia de qualquer tipo. Não nos responsabilizamos por perdas, danos ou problemas no seu
              servidor decorrentes do uso. Você é responsável por testar e validar tudo antes de pôr em
              produção.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">5. Comunidade (Discord)</h2>
            <p>
              O servidor Discord da MRI Qbox Brasil tem regras próprias publicadas internamente.
              Comportamento abusivo, spam, divulgação de cheats ou de material protegido por copyright
              resulta em banimento, sem aviso prévio quando necessário.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">6. Anúncios</h2>
            <p>
              Este site exibe anúncios via Google AdSense, mediante seu consentimento. Não endossamos
              produtos ou serviços anunciados. Conflitos com anunciantes devem ser resolvidos diretamente
              com eles ou via Google.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">7. Mudanças nestes termos</h2>
            <p>
              Podemos atualizar estes termos. Mudanças significativas são anunciadas no Discord. Continuar
              usando o site após atualização constitui aceite.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">8. Lei aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Foro de São Paulo/SP
              para qualquer disputa não resolvida amigavelmente.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">9. Contato</h2>
            <p>
              Dúvidas sobre estes termos:{" "}
              <a
                href="https://discord.mriqbox.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                discord.mriqbox.com.br
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
