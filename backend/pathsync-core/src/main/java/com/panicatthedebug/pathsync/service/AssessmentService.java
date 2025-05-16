package com.panicatthedebug.pathsync.service;

import com.panicatthedebug.pathsync.exception.QuestionNotFoundException;
import com.panicatthedebug.pathsync.model.QuestionBankItem;
import com.panicatthedebug.pathsync.repository.QuestionBankRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AssessmentService {
    private final QuestionBankRepository questionBankRepository;

    public AssessmentService(QuestionBankRepository questionBankRepository) {
        this.questionBankRepository = questionBankRepository;
    }

    public Map<String, String> analyzeTestResults(Map<String, String> questionResults) throws QuestionNotFoundException {
        Map<String, Integer> correctAnswersByTopic = new HashMap<>();
        Map<String, Integer> totalQuestionsByTopic = new HashMap<>();

        for (String questionId : questionResults.keySet()) {
            QuestionBankItem questionBankItem = questionBankRepository.getTopicById(questionId);
            if (questionBankItem == null) {
                throw new QuestionNotFoundException("Question ID not found: " + questionId);
            }
            String topic = questionBankItem.getTopic();
            totalQuestionsByTopic.put(topic, totalQuestionsByTopic.getOrDefault(topic, 0) + 1);
            if (questionResults.get(questionId).equalsIgnoreCase("correct")) {
                correctAnswersByTopic.put(topic, correctAnswersByTopic.getOrDefault(topic, 0) + 1);
            }
        }

        Map<String, String> proficiencyByTopic = new HashMap<>();
        for (String topic : totalQuestionsByTopic.keySet()) {
            int correct = correctAnswersByTopic.getOrDefault(topic, 0);
            int total = totalQuestionsByTopic.get(topic);
            double accuracy = (double) correct / total;

            if (accuracy >= 0.8) {
                proficiencyByTopic.put(topic, "Expert");
            } else if (accuracy >= 0.5) {
                proficiencyByTopic.put(topic, "Intermediate");
            } else {
                proficiencyByTopic.put(topic, "Beginner");
            }
        }

        return proficiencyByTopic;
    }

    public Map<String, String> getProficiencyByTopic(Map<String, Map<String, String>> questionOutcomes) throws QuestionNotFoundException {
        return analyzeTestResults(questionOutcomes.get("questionResults"));
    }
}
