package com.panicatthedebug.pathsync.controller;

import com.panicatthedebug.pathsync.exception.LearnPathNotFoundException;
import com.panicatthedebug.pathsync.exception.QuestionNotFoundException;
import com.panicatthedebug.pathsync.exception.SurveyNotCompleteException;
import com.panicatthedebug.pathsync.exception.UserNotFoundException;
import com.panicatthedebug.pathsync.model.CustomLearningPath;
import com.panicatthedebug.pathsync.model.StandardLearningPath;
import com.panicatthedebug.pathsync.repository.StandardLearningPathRepository;
import com.panicatthedebug.pathsync.service.AssessmentService;
import com.panicatthedebug.pathsync.service.LearningPathService;
import com.panicatthedebug.pathsync.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/learn-path")
public class LearningPathController {

    private final StandardLearningPathRepository standardLearningPathRepository;
    private final LearningPathService learningPathService;
    private final AssessmentService assessmentService;
    private final UserService userService;

    public LearningPathController(StandardLearningPathRepository standardLearningPathRepository, LearningPathService learningPathService, AssessmentService assessmentService, UserService userService) {
        this.standardLearningPathRepository = standardLearningPathRepository;
        this.learningPathService = learningPathService;
        this.assessmentService = assessmentService;
        this.userService = userService;
    }

    /**
     * Endpoint to add a new standard learning path to the database.
     *
     * @param standardLearningPath The standard learning path to be added.
     * @return A response entity with the saved learning path.
     */
    @PostMapping("/add")
    public ResponseEntity<StandardLearningPath> addStandardLearningPath(@Valid @RequestBody StandardLearningPath standardLearningPath) {
        StandardLearningPath savedLearningPath = standardLearningPathRepository.save(standardLearningPath);
        return ResponseEntity.status(201).body(savedLearningPath);
    }

    /**
     * Endpoint to retrieve a custom learning path generated for a user.
     *
     * @param authentication The authentication object containing user details.
     * @param proficiencyByTopic A map of topic IDs and their corresponding proficiency levels.
     * @return A response entity with the fetched custom learning path.
     */
    @GetMapping("/fetch")
    public ResponseEntity<CustomLearningPath> getCustomLearningPath(Authentication authentication,
                                                                    @RequestBody Map<String, String> proficiencyByTopic) throws LearnPathNotFoundException {

        return ResponseEntity.ok(learningPathService.getCustomLearningPath(authentication.getName(), proficiencyByTopic));
    }

    /**
     * Endpoint to create a custom learning path based on user assessment results.
     *
     * @param authentication The authentication object containing user details.
     * @param questionOutcomes The assessment summary containing question results.
     * @return A response entity with the created custom learning path.
     */
    @GetMapping("/create")
    public ResponseEntity<CustomLearningPath> createCustomLearningPath(Authentication authentication,
                                                                       @RequestBody Map<String, Map<String, String>> questionOutcomes) throws UserNotFoundException, QuestionNotFoundException, SurveyNotCompleteException {
        Map<String, String> proficiencyByTopic = assessmentService.getProficiencyByTopic(questionOutcomes);
        return ResponseEntity.ok(learningPathService.createCustomLearningPath(userService
                        .getUserByEmail(authentication.getName()), proficiencyByTopic));
    }
}
