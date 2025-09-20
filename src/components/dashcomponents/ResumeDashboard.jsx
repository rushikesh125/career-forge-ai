import React, { useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Code,
  Database,
  Settings,
  Layout,
  BookOpen,
  Users,
  Globe,
  Rocket,
  Shapes,
  Brain,
  Target,
  Heart,
  Cloud,
  Monitor,
} from "lucide-react";

// Card Components with consistent theming
export const Card = ({ className = "", children }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const HalfCard = ({ className = "", children }) => (
  <div
    className={`rounded-lg w-full lg:w-1/2 border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const CardTitle = ({ className = "", children }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

export const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors
                    bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 
                    dark:hover:bg-purple-900/50 text-purple-900 dark:text-purple-100 ${className}`}
  >
    {children}
  </span>
);

// Updated icon mappings
const skillCategoryIcons = {
  "Programming Languages": Code,
  Technical: Settings,
  Professional: Brain,
  "Digital Marketing": Target,
  "Content Marketing": BookOpen,
  "Analytics & Tools": Database,
  "Social Media Marketing": Globe,
  "Brand Management": Shapes,
  "Soft Skills": Heart,
  "Web Development": Layout,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Operating Systems": Monitor,
  "Tools & Technologies": Settings,
};

const sectionIcons = {
  summary: BookOpen,
  skills: Rocket,
  projects: Layout,
  experience: Briefcase,
  education: GraduationCap,
  certifications: Award,
  extracurricular: Users,
};

const SectionIcon = ({ name, className }) => {
  const IconComponent = sectionIcons[name] || Star;
  return <IconComponent className={className} />;
};

const ResumeDashboard = ({ data }) => {
  const renderSkillBadges = (skills) => (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge
          key={skill}
          className="transition-all duration-300 hover:scale-105"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );

  const renderSection = (title, content, icon) => (
    <Card className="mb-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center space-x-2">
        <SectionIcon
          name={icon}
          className="w-6 h-6 text-purple-600 dark:text-purple-400"
        />
        <CardTitle className="bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <div className="w-full md:flex gap-6">
        <HalfCard className="mb-6 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h1
                className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 
                            bg-clip-text text-transparent"
              >
                {data.personalInfo?.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-300">
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{data.personalInfo?.email}</span>
                </a>
                {data.personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{data.personalInfo?.phone}</span>
                  </span>
                )}
                {data.personalInfo?.linkedin && (
                  <a
                    href={`https://${data.personalInfo.linkedin}`}
                    className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {data.personalInfo?.portfolio && (
                  <a
                    href={
                      data.personalInfo.portfolio.startsWith("http")
                        ? data.personalInfo.portfolio
                        : `https://${data.personalInfo.portfolio}`
                    }
                    className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </HalfCard>

        {/* Summary Section */}
        <HalfCard className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          {renderSection(
            "Professional Summary",
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {data?.summary}
            </p>,
            "summary"
          )}
        </HalfCard>
      </div>

      {/* Skills Section */}
      {renderSection(
        "Skills",
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills?.categories?.map(({ category, skills }) => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 capitalize flex items-center gap-2">
                {skillCategoryIcons[category] &&
                  React.createElement(skillCategoryIcons[category], {
                    className: "w-4 h-4 text-purple-600 dark:text-purple-400",
                  })}
                {category}
              </h3>
              {renderSkillBadges(skills)}
            </div>
          ))}
        </div>,
        "skills"
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 &&
        renderSection(
          "Projects",
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div
                key={project?.title}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
              >
                <h3
                  className="font-semibold text-lg bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 
                           bg-clip-text text-transparent mb-2"
                >
                  {project?.title}
                </h3>
                {project?.details && project.details?.length > 0 && (
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {project?.details?.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {project?.technologies && (
                  <div className="mt-4">
                    {renderSkillBadges(project?.technologies)}
                  </div>
                )}
              </div>
            ))}
          </div>,
          "projects"
        )}

      {/* Experience Section */}
      {renderSection(
        "Experience",
        data.experience?.map((exp) => (
          <div key={`${exp.company}-${exp.title}`} className="mb-6 last:mb-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
              <div>
                <h3
                  className="font-semibold text-lg bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 
                             bg-clip-text text-transparent"
                >
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.company} {exp.location && `- ${exp.location}`}
                </p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                {exp.period}
              </span>
            </div>
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )),
        "experience"
      )}

      {/* Education Section */}
      {renderSection(
        "Education",
        <div>
          {data.education.map((edu) => (
            <div key={edu.school} className="mb-6 last:mb-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <div>
                  <h3
                    className="font-semibold text-lg bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 
                               bg-clip-text text-transparent"
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.school} {edu.location && `- ${edu.location}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {edu.graduation}
                  </span>
                  {edu.gpa && (
                    <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
              {edu.courses && (
                <div className="mt-4">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevant Coursework:
                  </p>
                  {renderSkillBadges(edu.courses)}
                </div>
              )}
            </div>
          ))}
        </div>,
        "education"
      )}

      {/* Additional Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        {data.certifications &&
          data.certifications.length > 0 &&
          renderSection(
            "Certifications",
            <ul className="space-y-2">
              {data.certifications.map((cert, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Award className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>,
            "certifications"
          )}

        {/* Extracurricular Activities */}
        {data.extracurricular &&
          data.extracurricular.length > 0 &&
          renderSection(
            "Extracurricular Activities",
            <ul className="space-y-2">
              {data.extracurricular.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Users className="w-4 h-4 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>,
            "extracurricular"
          )}
      </div>
    </div>
  );
};

export default ResumeDashboard;