package com.panicatthedebug.pathsync.service;

import com.panicatthedebug.pathsync.model.*;
import com.panicatthedebug.pathsync.dto.SurveySubmissionDTO;
import com.panicatthedebug.pathsync.exception.ResourceNotFoundException;
import com.panicatthedebug.pathsync.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SurveyService {

    private final SurveyResponseRepository surveyResponseRepository;
    private final SurveyDefinitionRepository surveyDefinitionRepository;
    private final UserRepository userRepository;

    public SurveyService(
            SurveyResponseRepository surveyResponseRepository,
            SurveyDefinitionRepository surveyDefinitionRepository,
            UserRepository userRepository) {
        this.surveyResponseRepository = surveyResponseRepository;
        this.surveyDefinitionRepository = surveyDefinitionRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initializeSurveyDefinitions() {
        // Check if survey definitions exist
        if (surveyDefinitionRepository.count() == 0) {
            createDefaultSurveyDefinitions();
        }
    }

    private void createDefaultSurveyDefinitions() {
        // Create Backend Java survey
        SurveyDefinition backendJava = new SurveyDefinition();
        backendJava.setId(UUID.randomUUID().toString());
        backendJava.setTargetRole("Backend Engineer");
        backendJava.setLanguage("Java");
        backendJava.setActive(true);
        backendJava.setQuestions(createBackendJavaQuestions());
        surveyDefinitionRepository.save(backendJava);

        // Create Frontend JavaScript survey
        SurveyDefinition frontendJs = new SurveyDefinition();
        frontendJs.setId(UUID.randomUUID().toString());
        frontendJs.setTargetRole("Frontend Engineer");
        frontendJs.setLanguage("JavaScript");
        frontendJs.setActive(true);
        frontendJs.setQuestions(createFrontendJsQuestions());
        surveyDefinitionRepository.save(frontendJs);

        // Create Testing Java survey
        SurveyDefinition testingJava = new SurveyDefinition();
        testingJava.setId(UUID.randomUUID().toString());
        testingJava.setTargetRole("Testing Engineer");
        testingJava.setLanguage("Java");
        testingJava.setActive(true);
        testingJava.setQuestions(createTestingJavaQuestions());
        surveyDefinitionRepository.save(testingJava);
    }

    private List<SkillQuestion> createBackendJavaQuestions() {
        List<SkillQuestion> questions = new ArrayList<>();

        // Question 1
        SkillQuestion q1 = new SkillQuestion();
        q1.setId("bj1");
        q1.setText("How comfortable are you with Java syntax and core concepts?");
        q1.setSkillCategory("Java");
        q1.setOptions(List.of(
                "I'm new to Java or have limited knowledge",
                "I understand basic syntax and can write simple programs",
                "I'm comfortable with most Java features including OOP concepts",
                "I have deep knowledge of Java including advanced features"
        ));
        questions.add(q1);

        // Question 2
        SkillQuestion q2 = new SkillQuestion();
        q2.setId("bj2");
        q2.setText("Have you worked with Spring Boot before?");
        q2.setSkillCategory("Spring Boot");
        q2.setOptions(List.of(
                "Never used it",
                "I've used it in tutorials or small projects",
                "I've built multiple applications with Spring Boot",
                "I've built complex enterprise applications with Spring Boot"
        ));
        questions.add(q2);

        // Question 3
        SkillQuestion q3 = new SkillQuestion();
        q3.setId("bj3");
        q3.setText("How experienced are you with designing and implementing RESTful APIs?");
        q3.setSkillCategory("REST APIs");
        q3.setOptions(List.of(
                "No experience",
                "I understand the concepts but have limited practical experience",
                "I've designed and implemented several RESTful APIs",
                "I've designed complex API architectures following best practices"
        ));
        questions.add(q3);

        // Question 4
        SkillQuestion q4 = new SkillQuestion();
        q4.setId("bj4");
        q4.setText("How would you rate your SQL knowledge?");
        q4.setSkillCategory("SQL");
        q4.setOptions(List.of(
                "I know little to no SQL",
                "I can write basic queries (SELECT, INSERT, UPDATE, DELETE)",
                "I'm comfortable with joins, subqueries, and database design",
                "I have advanced SQL knowledge including optimization and performance tuning"
        ));
        questions.add(q4);

        // Question 5
        SkillQuestion q5 = new SkillQuestion();
        q5.setId("bj5");
        q5.setText("How familiar are you with microservices architecture?");
        q5.setSkillCategory("Microservices");
        q5.setOptions(List.of(
                "Not familiar at all",
                "I understand the concept but haven't implemented it",
                "I've worked on microservices-based applications",
                "I've designed and implemented complex microservices architectures"
        ));
        questions.add(q5);

        return questions;
    }

    private List<SkillQuestion> createFrontendJsQuestions() {
        List<SkillQuestion> questions = new ArrayList<>();

        // Question 1
        SkillQuestion q1 = new SkillQuestion();
        q1.setId("fj1");
        q1.setText("How comfortable are you with JavaScript syntax and core concepts?");
        q1.setSkillCategory("JavaScript");
        q1.setOptions(List.of(
                "I'm new to JavaScript or have limited knowledge",
                "I understand basic syntax and can write simple scripts",
                "I'm comfortable with most JS features including ES6+",
                "I have deep knowledge of JavaScript including advanced patterns"
        ));
        questions.add(q1);

        // Question 2
        SkillQuestion q2 = new SkillQuestion();
        q2.setId("fj2");
        q2.setText("Have you worked with React before?");
        q2.setSkillCategory("React");
        q2.setOptions(List.of(
                "Never used it",
                "I've used it in tutorials or small projects",
                "I've built multiple applications with React",
                "I've built complex applications with advanced React patterns"
        ));
        questions.add(q2);

        // Question 3
        SkillQuestion q3 = new SkillQuestion();
        q3.setId("fj3");
        q3.setText("How experienced are you with Node.js?");
        q3.setSkillCategory("Node.js");
        q3.setOptions(List.of(
                "No experience",
                "I've used it for simple scripts or basic servers",
                "I've built several applications with Node.js",
                "I've built complex backend systems with Node.js"
        ));
        questions.add(q3);

        // Question 4
        SkillQuestion q4 = new SkillQuestion();
        q4.setId("fj4");
        q4.setText("How would you rate your HTML/CSS knowledge?");
        q4.setSkillCategory("HTML/CSS");
        q4.setOptions(List.of(
                "I know basic HTML tags and CSS properties",
                "I can create simple responsive layouts",
                "I'm comfortable with advanced CSS including flexbox and grid",
                "I have expert-level knowledge of HTML5 and CSS3 features"
        ));
        questions.add(q4);

        // Question 5
        SkillQuestion q5 = new SkillQuestion();
        q5.setId("fj5");
        q5.setText("How familiar are you with state management in React (Redux, Context API, etc.)?");
        q5.setSkillCategory("State Management");
        q5.setOptions(List.of(
                "Not familiar at all",
                "I understand the concepts but have limited experience",
                "I've used Redux or Context API in several projects",
                "I've implemented complex state management solutions"
        ));
        questions.add(q5);

        return questions;
    }

    private List<SkillQuestion> createTestingJavaQuestions() {
        List<SkillQuestion> questions = new ArrayList<>();

        // Question 1
        SkillQuestion q1 = new SkillQuestion();
        q1.setId("tj1");
        q1.setText("How comfortable are you with Java syntax and core concepts?");
        q1.setSkillCategory("Java");
        q1.setOptions(List.of(
                "I'm new to Java or have limited knowledge",
                "I understand basic syntax and can write simple programs",
                "I'm comfortable with most Java features including OOP concepts",
                "I have deep knowledge of Java including advanced features"
        ));
        questions.add(q1);

        // Question 2
        SkillQuestion q2 = new SkillQuestion();
        q2.setId("tj2");
        q2.setText("Have you worked with Selenium before?");
        q2.setSkillCategory("Selenium");
        q2.setOptions(List.of(
                "Never used it",
                "I've used it in tutorials or simple test cases",
                "I've created test suites with Selenium",
                "I've built comprehensive test frameworks using Selenium"
        ));
        questions.add(q2);

        // Question 3
        SkillQuestion q3 = new SkillQuestion();
        q3.setId("tj3");
        q3.setText("How experienced are you with Behavior-Driven Development (BDD)?");
        q3.setSkillCategory("BDD");
        q3.setOptions(List.of(
                "No experience",
                "I understand the concepts but have limited practical experience",
                "I've used BDD frameworks like Cucumber in several projects",
                "I've implemented comprehensive BDD testing strategies"
        ));
        questions.add(q3);

        // Question 4
        SkillQuestion q4 = new SkillQuestion();
        q4.setId("tj4");
        q4.setText("How would you rate your knowledge of JUnit?");
        q4.setSkillCategory("JUnit");
        q4.setOptions(List.of(
                "I know little to nothing about JUnit",
                "I can write basic unit tests with JUnit",
                "I'm comfortable with advanced JUnit features and mocking",
                "I have expert-level knowledge of JUnit and testing best practices"
        ));
        questions.add(q4);

        // Question 5
        SkillQuestion q5 = new SkillQuestion();
        q5.setId("tj5");
        q5.setText("How familiar are you with test planning and strategy?");
        q5.setSkillCategory("Test Planning");
        q5.setOptions(List.of(
                "Not familiar at all",
                "I understand basic test planning concepts",
                "I've created test plans for several projects",
                "I've designed comprehensive test strategies for complex systems"
        ));
        questions.add(q5);

        return questions;
    }

    public SurveyDefinition getSurveyDefinition(String targetRole, String language) {
        return surveyDefinitionRepository
                .findByTargetRoleAndLanguageAndActive(targetRole, language, true)
                .orElseThrow(() -> new ResourceNotFoundException("Survey definition not found"));
    }

    public SurveyResponse submitSurvey(String userId, SurveySubmissionDTO submission) {
        // Validate user exists
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Create survey response
        SurveyResponse response = new SurveyResponse();
        response.setId(UUID.randomUUID().toString());
        response.setUserId(userId);
        response.setTargetRole(submission.getTargetRole());
        response.setPreferredLanguage(submission.getPreferredLanguage());
        response.setSkillAssessments(evaluateSkillLevels(submission.getSkillResponses()));
        response.setOverallSkillLevel(determineOverallSkillLevel(response.getSkillAssessments()));
        response.setCompletedAt(new Date());

        // Save and return
        return surveyResponseRepository.save(response);
    }

    private Map<String, String> evaluateSkillLevels(Map<String, Integer> skillResponses) {
        Map<String, String> skillLevels = new HashMap<>();

        for (Map.Entry<String, Integer> entry : skillResponses.entrySet()) {
            String skill = entry.getKey();
            int responseIndex = entry.getValue();

            // Convert response index to skill level
            String skillLevel;
            if (responseIndex == 0) {
                skillLevel = "BEGINNER";
            } else if (responseIndex == 1 || responseIndex == 2) {
                skillLevel = "INTERMEDIATE";
            } else {
                skillLevel = "ADVANCED";
            }

            skillLevels.put(skill, skillLevel);
        }

        return skillLevels;
    }

    private String determineOverallSkillLevel(Map<String, String> skillLevels) {
        // Count occurrences of each level
        int beginnerCount = 0;
        int intermediateCount = 0;
        int advancedCount = 0;

        for (String level : skillLevels.values()) {
            switch (level) {
                case "BEGINNER" -> beginnerCount++;
                case "INTERMEDIATE" -> intermediateCount++;
                case "ADVANCED" -> advancedCount++;
            }
        }

        // Determine overall level based on majority
        if (beginnerCount >= intermediateCount && beginnerCount >= advancedCount) {
            return "BEGINNER";
        } else if (intermediateCount >= beginnerCount && intermediateCount >= advancedCount) {
            return "INTERMEDIATE";
        } else {
            return "ADVANCED";
        }
    }

    public Optional<SurveyResponse> getUserSurvey(String userId) {
        return surveyResponseRepository.findByUserId(userId);
    }
}