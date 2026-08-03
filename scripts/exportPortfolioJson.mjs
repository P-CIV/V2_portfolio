import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = path.resolve(process.cwd());
const tsPath = path.join(root, 'src', 'data', 'portfolio.ts');
const jsonPath = path.join(root, 'public', 'cv-content.json');

async function buildSections(portfolioData) {
  const contactLines = [];
  if (portfolioData.personal?.email) contactLines.push(`📧 Email: ${portfolioData.personal.email}`);
  if (portfolioData.personal?.location?.fr) contactLines.push(`📍 Adresse: ${portfolioData.personal.location.fr}`);
  if (portfolioData.personal?.social?.github) contactLines.push(`🔗 GitHub: ${portfolioData.personal.social.github}`);
  if (portfolioData.personal?.social?.linkedin) contactLines.push(`🔗 LinkedIn: ${portfolioData.personal.social.linkedin}`);
  if (portfolioData.personal?.social?.twitter) contactLines.push(`🔗 Twitter: ${portfolioData.personal.social.twitter}`);

  const contact = contactLines.join('\n');
  const about = portfolioData.about?.fr || '';

  const experience = Array.isArray(portfolioData.experiences) && portfolioData.experiences.length > 0
    ? portfolioData.experiences.map((exp) => {
        const parts = [];
        if (exp.company) parts.push(`Entreprise: ${exp.company}`);
        if (exp.position?.fr) parts.push(`Poste: ${exp.position.fr}`);
        if (exp.period?.fr) parts.push(`Période: ${exp.period.fr}`);
        if (exp.description?.fr) parts.push(`Description: ${exp.description.fr}`);
        if (exp.technologies?.length) parts.push(`Technologies: ${exp.technologies.join(', ')}`);
        return parts.join(' — ');
      }).join('\n\n')
    : '';

  const skills = Array.isArray(portfolioData.skills?.categories)
    ? portfolioData.skills.categories.map((category) => {
        const title = category.name?.fr || category.name?.en || 'Compétences';
        const list = category.skills?.join(', ') || '';
        return `**${title}**: ${list}`;
      }).join('\n')
    : '';

  const education = Array.isArray(portfolioData.formations) && portfolioData.formations.length > 0
    ? portfolioData.formations.map((formation) => {
        const title = formation.title?.fr || formation.title?.en || '';
        const school = formation.school || '';
        const period = formation.period?.fr || formation.period?.en || '';
        const description = formation.description?.fr || formation.description?.en || '';
        return `• **${title}** - ${school} (${period})\n${description}`.trim();
      }).join('\n\n')
    : '';

  const formations = education;

  const certifications = Array.isArray(portfolioData.certifications) && portfolioData.certifications.length > 0
    ? portfolioData.certifications.map((cert) => {
        const title = cert.title || 'Certification';
        const issuer = cert.issuer || '';
        const date = cert.date || '';
        const skillsList = cert.skills?.length ? `\n   Compétences: ${cert.skills.join(', ')}` : '';
        return `• **${title}** - ${issuer} (${date})${skillsList}`;
      }).join('\n\n')
    : '';

  const projects = Array.isArray(portfolioData.projects) && portfolioData.projects.length > 0
    ? portfolioData.projects.map((project) => {
        const name = project.name || 'Projet';
        const description = project.description?.fr || project.description?.en || '';
        const tech = project.technologies?.length ? `Technologies: ${project.technologies.join(', ')}` : '';
        return `• **${name}**: ${description}${tech ? `\n   ${tech}` : ''}`;
      }).join('\n\n')
    : '';

  return {
    contact,
    about,
    experience,
    skills,
    education,
    formations,
    certifications,
    projects,
  };
}

async function main() {
  const source = await fs.readFile(tsPath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: tsPath,
  });

  const require = createRequire(import.meta.url);
  const context = {
    exports: {},
    module: { exports: {} },
    require,
    console,
    process,
    __dirname: path.dirname(tsPath),
    __filename: tsPath,
  };
  vm.createContext(context);
  const script = new vm.Script(transpiled.outputText, { filename: tsPath });
  script.runInContext(context);

  const portfolioData = context.module.exports.portfolioData || context.exports.portfolioData;
  if (!portfolioData) {
    throw new Error('Impossible de trouver portfolioData dans src/data/portfolio.ts');
  }

  const sections = await buildSections(portfolioData);
  await fs.writeFile(jsonPath, JSON.stringify({ sections }, null, 2), 'utf8');
  console.log(`Exported portfolio JSON to ${jsonPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
