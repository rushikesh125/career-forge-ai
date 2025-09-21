// use client";
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Brain,
  Code,
  Users,
  Target,
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle,
  BookOpen,
  Briefcase,
  DollarSign,
  Globe,
  BarChart,
  PieChart,
  CheckCircle,
  AlertTriangle,
  Zap,
  GraduationCap,
  HardDrive,
  ChevronRight,
  Calendar,
  Clock as ClockIcon
} from "lucide-react";

const RenderAssistantMessage = ({ children }) => {
  const content = children;
  // useEffect(() => {
  //   console.log("content for rending ", content);
  //   console.log("content for rending ", JSON.stringify(content));
  // }, []);

  if (!content) return <p className="text-foreground">No content available</p>;

  // Handle plain string messages
  if (typeof content === "string") {
    return (
      <div className="prose dark:prose-invert prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    );
  }

  // Extract properties with comprehensive fallbacks
  const response = {
    response_type: content.response_type || "text",
    text_response: content.text_response || content.text || "",
    career_advisor_report: content.career_advisor_report || content.report || null
  };

  // Deep safe access function
  const safeGet = (obj, path, defaultValue = null) => {
    try {
      return path.split('.').reduce((o, p) => (o && p in o) ? o[p] : defaultValue, obj);
    } catch {
      return defaultValue;
    }
  };

  // Array safe access
  const safeArray = (arr, defaultValue = []) => Array.isArray(arr) ? arr : defaultValue;

  // Object safe access
  const safeObject = (obj, defaultValue = {}) => (typeof obj === 'object' && obj !== null) ? obj : defaultValue;

  // Render badges for arrays
  const renderBadges = (items, variant = "default", maxItems = 6) => {
    const arr = safeArray(items);
    if (arr.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1">
        {arr.slice(0, maxItems).map((item, idx) => (
          <Badge key={idx} variant={variant} className="text-xs">
            {String(item)}
          </Badge>
        ))}
        {arr.length > maxItems && (
          <Badge variant="outline" className="text-xs">
            +{arr.length - maxItems}
          </Badge>
        )}
      </div>
    );
  };

  // Render numbered list
  const renderNumberedList = (items, title = null) => {
    const arr = safeArray(items);
    if (arr.length === 0) return null;
    return (
      <div className="space-y-2">
        {title && <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">{title}</h4>}
        <div className="space-y-2">
          {arr.slice(0, 8).map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                {idx + 1}
              </div>
              <div className="text-sm text-foreground leading-relaxed">
                {String(item)}
              </div>
            </div>
          ))}
          {arr.length > 8 && (
            <div className="text-center py-3 text-sm text-muted-foreground border-t border-border">
              +{arr.length - 8} more items...
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render module accordion item
  const renderModuleItem = (module, idx) => {
    const safeModule = safeObject(module);
    const name = safeGet(safeModule, 'module_name', `Module ${idx + 1}`);
    const duration = safeGet(safeModule, 'duration_months', 1);
    const description = safeGet(safeModule, 'description', 'No description available');
    const difficulty = safeGet(safeModule, 'difficulty_level', 'Intermediate');
    const format = safeGet(safeModule, 'learning_format', 'Mixed');
    const hours = safeGet(safeModule, 'estimated_hours_per_week', 10);
    const prerequisites = safeArray(safeGet(safeModule, 'prerequisites'));
    const skills = safeArray(safeGet(safeModule, 'skill_tags'));
    const milestones = safeArray(safeGet(safeModule, 'milestones'));
    const assessment = safeGet(safeModule, 'assessment', null);
    const certification = safeGet(safeModule, 'certification', null);
    const status = safeGet(safeModule, 'progress_status', 'Not Started');
    const difficultyColor = {
      'Beginner': 'bg-green-500/10 text-green-700 dark:text-green-400',
      'Intermediate': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
      'Advanced': 'bg-red-500/10 text-red-700 dark:text-red-400'
    }[difficulty] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    return (
      <AccordionItem value={`module-${idx}`} className="border border-border rounded-lg overflow-hidden">
        <AccordionTrigger className="hover:bg-accent px-4 py-3 text-left">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-3 h-3 rounded-full ${
                difficulty === 'Beginner' ? 'bg-green-500' :
                difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-medium text-foreground truncate">{name}</span>
            </div>
            <div className="flex-shrink-0 text-right text-xs space-y-1 ml-2">
              <div className="text-muted-foreground">{duration} mo</div>
              <Badge className={`${difficultyColor} text-xs px-2 py-0.5`}>
                {difficulty}
              </Badge>
              <div className={`text-xs px-1 py-0.5 rounded-full ${
                status === 'Completed' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                'bg-gray-500/10 text-gray-700 dark:text-gray-400'
              }`}>
                {status}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-4 space-y-4 bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Description</p>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-foreground mb-1">Format & Time</p>
                <div className="space-y-1 text-muted-foreground">
                  <p>• {format}</p>
                  <p>• {hours} hrs/week</p>
                </div>
              </div>
              {prerequisites.length > 0 && (
                <div>
                  <p className="font-medium text-foreground mb-1">Prerequisites</p>
                  <div className="flex flex-wrap gap-1">
                    {prerequisites.map((pre, pIdx) => (
                      <Badge key={pIdx} variant="outline" className="text-xs">
                        {pre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {skills.length > 0 && (
            <div>
              <p className="font-medium text-foreground mb-2">Skills Gained</p>
              {renderBadges(skills, "secondary")}
            </div>
          )}
          {milestones.length > 0 && (
            <div>
              <p className="font-medium text-foreground mb-2">Key Milestones</p>
              <div className="space-y-2">
                {milestones.slice(0, 4).map((milestone, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2 p-2 bg-background rounded text-sm border border-border">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{milestone}</span>
                  </div>
                ))}
                {milestones.length > 4 && (
                  <div className="text-center py-2 text-sm text-muted-foreground">
                    +{milestones.length - 4} more milestones
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-border">
            {assessment && (
              <div className="bg-blue-500/5 p-3 rounded border border-blue-500/20">
                <p className="font-medium text-blue-700 dark:text-blue-400 text-xs mb-1">Assessment</p>
                <p className="text-blue-600 dark:text-blue-300 text-xs">{assessment}</p>
              </div>
            )}
            {certification && (
              <div className="bg-green-500/5 p-3 rounded border border-green-500/20">
                <p className="font-medium text-green-700 dark:text-green-400 text-xs mb-1">Certification</p>
                <p className="text-green-600 dark:text-green-300 text-xs">{certification}</p>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Render project card
  const renderProjectItem = (project, idx) => {
    const safeProject = safeObject(project);
    const name = safeGet(safeProject, 'project_name', `Project ${idx + 1}`);
    const description = safeGet(safeProject, 'description', 'No description available');
    const duration = safeGet(safeProject, 'duration_months', 1);
    const skills = safeArray(safeGet(safeProject, 'skills_applied'));
    const certification = safeGet(safeProject, 'certification', null);
    return (
      <Card className="border-border hover:shadow-md transition-shadow h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-foreground pr-2 flex-1 line-clamp-2">{name}</h4>
            <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0 ml-2">
              {duration} mo
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{description}</p>
          {skills.length > 0 && (
            <div className="mb-3">
              {renderBadges(skills, "secondary")}
            </div>
          )}
          {certification && (
            <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700 dark:text-green-400">
              {certification}
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  // Render interview question
  const renderQuestionItem = (question, idx) => {
    const safeQuestion = safeObject(question);
    const qText = safeGet(safeQuestion, 'question', 'No question available');
    const answer = safeGet(safeQuestion, 'answer_suggestion', 'No answer suggestion available');
    const category = safeGet(safeQuestion, 'category', 'General');
    const difficulty = safeGet(safeQuestion, 'difficulty_level', 'Medium');
    const length = safeGet(safeQuestion, 'expected_answer_length', null);
    const followups = safeArray(safeGet(safeQuestion, 'follow_up_questions'));
    const difficultyColor = {
      'Easy': 'bg-green-500/10 text-green-700 dark:text-green-400',
      'Medium': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
      'Hard': 'bg-red-500/10 text-red-700 dark:text-red-400'
    }[difficulty] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    return (
      <Card className="border-border hover:shadow-sm h-full flex flex-col">
        <CardHeader className="p-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm leading-tight line-clamp-3">{qText}</h4>
            </div>
            <div className="flex flex-col items-end gap-2 text-xs min-w-[80px] flex-shrink-0">
              <Badge className={`${difficultyColor} px-2 py-1`}>
                {difficulty}
              </Badge>
              <span className="text-muted-foreground">{category}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3 flex-grow">
          {answer && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="font-medium text-foreground mb-2 text-xs">Suggested Answer:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
              {length && (
                <p className="text-xs text-muted-foreground mt-2 font-mono bg-background px-2 py-1 rounded inline-block border border-border">
                  📝 {length}
                </p>
              )}
            </div>
          )}
          {followups.length > 0 && (
            <div className="bg-blue-500/5 p-3 rounded-lg border-l-4 border-blue-500/50">
              <p className="font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={14} /> Follow-up Questions
              </p>
              <div className="space-y-1">
                {followups.map((fu, fuIdx) => (
                  <div key={fuIdx} className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-300">
                    <ChevronRight size={14} className="mt-1 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                    <span>{fu}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  switch (response.response_type) {
    case "text":
      return (
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <p className="text-foreground leading-relaxed">{response.text_response}</p>
        </div>
      );
    case "analysis":
      if (!response.career_advisor_report) {
        return (
          <div>
            <p className="font-semibold text-foreground text-lg mb-4">{response.text_response}</p>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Career guidance data is being prepared...</p>
                  <p className="text-sm mt-2">Try asking about a specific role or skill!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }
      const report = safeObject(response.career_advisor_report);
      const learningPath = safeObject(safeGet(report, 'personalized_learning_path'));
      const careerInsights = safeObject(safeGet(report, 'career_insights'));
      const jobPrep = safeObject(safeGet(report, 'job_preparation'));
      const targetRole = safeGet(learningPath, 'target_role', 'Professional Developer');
      const totalDuration = safeGet(learningPath, 'total_duration_months', 0);
      const modules = safeArray(safeGet(learningPath, 'modules'));
      const projects = safeArray(safeGet(learningPath, 'projects'));

      // Determine if sections should be rendered
      const hasLearningPathContent = modules.length > 0 || projects.length > 0;
      const hasCareerInsightsContent = Object.keys(careerInsights).length > 0;
      const hasJobPrepContent = Object.keys(jobPrep).length > 0; // Or check specific arrays like common_interview_questions

      return (
        <div className="space-y-6">
          {/* Header */}
          <Card className="border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={20} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  {response.text_response || "Comprehensive Career Analysis"}
                </h2>
              </div>
              {targetRole !== 'Professional Developer' && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Target size={16} />
                  <span>Targeting: {targetRole}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Path Section */}
          {hasLearningPathContent && (
            <Card className="border-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <GraduationCap size={18} />
                  Personalized Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overview Stats - Only show if there's actual content */}
                {(modules.length > 0 || projects.length > 0) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary truncate">{targetRole}</p>
                      <p className="text-xs text-muted-foreground mt-1">Target Role</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{totalDuration} months</p>
                      <p className="text-xs text-muted-foreground mt-1">Total Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{modules.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Modules</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{projects.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Projects</p>
                    </div>
                  </div>
                )}

                {/* Learning Modules - Only render if modules exist */}
                {modules.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2 border-b border-border pb-2">
                      <BookOpen size={18} /> Learning Modules
                    </h3>
                    <Accordion type="multiple" className="space-y-2">
                      {modules.slice(0, 6).map((module, idx) => renderModuleItem(module, idx))}
                    </Accordion>
                    {modules.length > 6 && (
                      <div className="text-center py-4 text-sm text-muted-foreground border-t border-border">
                        +{modules.length - 6} more modules available
                      </div>
                    )}
                  </div>
                )}

                {/* Projects - Only render if projects exist */}
                {projects.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2 border-b border-border pb-2">
                      <Code size={18} /> Hands-on Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projects.slice(0, 6).map((project, idx) => renderProjectItem(project, idx))}
                    </div>
                    {projects.length > 6 && (
                      <div className="text-center py-4 text-sm text-muted-foreground border-t border-border">
                        +{projects.length - 6} more projects available
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Career Insights Section */}
          {hasCareerInsightsContent && (
            <Card className="border-border">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
                  <TrendingUp size={18} />
                  Career Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm border border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BarChart size={20} className="text-green-600 dark:text-green-400" />
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {safeGet(careerInsights, 'demand_level', 'High')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Demand Level</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm border border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign size={20} className="text-green-600 dark:text-green-400" />
                      <span className="text-base font-bold text-green-600 dark:text-green-400 break-words">
                        {safeGet(careerInsights, 'average_salary', '$0')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg Salary</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm border border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 break-words line-clamp-2">
                        {safeGet(careerInsights, 'location_insights', 'Global')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Locations</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg shadow-sm border border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Globe size={20} className="text-purple-600 dark:text-purple-400" />
                      <span className="text-base font-bold text-purple-600 dark:text-purple-400">
                        {safeGet(careerInsights, 'remote_opportunities', 'Available')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Remote</p>
                  </div>
                </div>
                {/* Detailed Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {safeArray(safeGet(careerInsights, 'top_companies')).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                          <Users size={16} /> Top Companies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {renderBadges(safeGet(careerInsights, 'top_companies'), "outline")}
                        </div>
                      </div>
                    )}
                    {safeGet(careerInsights, 'career_growth') && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                          <Briefcase size={16} /> Career Growth
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {safeGet(careerInsights, 'career_growth')}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Right Column */}
                  <div className="space-y-4">
                    {safeArray(safeGet(careerInsights, 'industry_trends')).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                          <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" /> Trends
                        </h4>
                        {renderBadges(safeGet(careerInsights, 'industry_trends'), "secondary")}
                      </div>
                    )}
                    {safeArray(safeGet(careerInsights, 'skills_gap')).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                          <AlertCircle size={16} className="text-orange-500" /> Skills Gap
                        </h4>
                        {renderBadges(safeGet(careerInsights, 'skills_gap'), "destructive")}
                      </div>
                    )}
                    {safeArray(safeGet(careerInsights, 'top_skills_in_demand')).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                          <Brain size={16} className="text-purple-600 dark:text-purple-400" /> In-Demand Skills
                        </h4>
                        {renderBadges(safeGet(careerInsights, 'top_skills_in_demand'), "secondary")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Preparation Section */}
          {hasJobPrepContent && (
            <Card className="border-border">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
                <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <Target size={18} />
                  Job Preparation Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Interview Questions */}
                {safeArray(safeGet(jobPrep, 'common_interview_questions')).length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-2 border-b border-border pb-2">
                      <Brain size={18} /> Interview Questions
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {safeArray(safeGet(jobPrep, 'common_interview_questions')).slice(0, 5).map((q, idx) =>
                        renderQuestionItem(q, idx)
                      )}
                    </div>
                    {safeArray(safeGet(jobPrep, 'common_interview_questions')).length > 5 && (
                      <div className="text-center py-4 text-sm text-muted-foreground border-t border-border">
                        +{safeArray(safeGet(jobPrep, 'common_interview_questions')).length - 5} more questions
                      </div>
                    )}
                  </div>
                )}
                {/* Tips and Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Preparation Tips */}
                  {safeArray(safeGet(jobPrep, 'preparation_tips')).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                        <Code size={18} /> Preparation Tips
                      </h3>
                      {renderNumberedList(safeGet(jobPrep, 'preparation_tips'), null)}
                    </div>
                  )}
                  {/* Resources */}
                  {safeArray(safeGet(jobPrep, 'resources')).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                        <BookOpen size={18} /> Resources
                      </h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {safeArray(safeGet(jobPrep, 'resources')).slice(0, 6).map((resource, idx) => (
                          <div key={idx} className="p-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
                            <p className="text-sm text-foreground line-clamp-2">{String(resource)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Study Plan & Other Sections */}
                {safeGet(jobPrep, 'recommended_study_time') && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="bg-orange-500/5 p-4 rounded-lg border border-orange-500/20">
                      <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                        <ClockIcon size={16} /> Study Plan
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {safeGet(jobPrep, 'recommended_study_time')}
                      </p>
                      {safeGet(jobPrep, 'behavioral_vs_technical_ratio') && (
                        <div className="text-xs space-y-1 mt-3 pt-2 border-t border-border">
                          <p className="font-medium text-foreground">Interview Focus:</p>
                          <p className="text-muted-foreground">{safeGet(jobPrep, 'behavioral_vs_technical_ratio')}</p>
                        </div>
                      )}
                    </div>
                    {/* Common Pitfalls */}
                    {safeArray(safeGet(jobPrep, 'common_pitfalls')).length > 0 && (
                      <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/20">
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                          <AlertCircle size={16} /> Common Pitfalls
                        </h4>
                        <div className="space-y-2 text-sm max-h-32 overflow-y-auto pr-1">
                          {safeArray(safeGet(jobPrep, 'common_pitfalls')).slice(0, 4).map((pitfall, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 bg-background rounded text-foreground border border-border">
                              <AlertTriangle size={14} className="mt-1 flex-shrink-0 text-red-500" />
                              <span className="text-sm">{String(pitfall)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Scenarios */}
                    {safeArray(safeGet(jobPrep, 'role_specific_scenarios')).length > 0 && (
                      <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                          <HardDrive size={16} /> Practice Scenarios
                        </h4>
                        <div className="space-y-2 text-sm max-h-32 overflow-y-auto pr-1">
                          {safeArray(safeGet(jobPrep, 'role_specific_scenarios')).slice(0, 3).map((scenario, idx) => (
                            <div key={idx} className="p-2 bg-background rounded text-foreground text-xs italic border-l-2 border-blue-500/50">
                              {String(scenario)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* HR Insights */}
                {safeArray(safeGet(jobPrep, 'hr_culture_insights')).length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                      <Users size={18} /> HR & Culture Insights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {safeArray(safeGet(jobPrep, 'hr_culture_insights')).slice(0, 6).map((insight, idx) => (
                        <div key={idx} className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                          <p className="text-sm text-foreground leading-relaxed">{String(insight)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Mock Interview Score */}
                {safeGet(jobPrep, 'mock_interview_score') !== undefined && (
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                      <BarChart size={18} /> Mock Interview Score
                    </h3>
                    <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:flex-1">
                          <Progress
                            value={Math.min(Math.max(safeGet(jobPrep, 'mock_interview_score'), 0), 100)}
                            className="h-3"
                          />
                        </div>
                        <div className="text-center sm:text-right">
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {safeGet(jobPrep, 'mock_interview_score')}%
                          </p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Performance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Empty State - Only show if none of the main content sections have data */}
          {!hasLearningPathContent && !hasCareerInsightsContent && !hasJobPrepContent && (
            <Card className="border-border">
              <CardContent className="pt-8 pb-6 text-center">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Your Next Step</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Your career analysis is complete! Try asking about specific skills, interview preparation, or salary expectations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      );
    default:
      // Debug mode for unknown formats
      console.warn("Unknown response type:", response.response_type, content);
      return (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-3">
            <AlertTriangle size={16} />
            <span className="font-medium">Debug Mode</span>
          </div>
          <p className="text-sm text-foreground mb-3">Unknown response format detected:</p>
          <div className="bg-background p-3 rounded border overflow-x-auto">
            <pre className="text-xs text-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Response Type: <span className="font-mono">{response.response_type}</span>
          </p>
        </div>
      );
  }
};

// Add CSS for line-clamp if needed
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `;
  if (!document.getElementById('line-clamp-style')) {
    style.id = 'line-clamp-style';
    document.head.appendChild(style);
  }
}

export default RenderAssistantMessage;