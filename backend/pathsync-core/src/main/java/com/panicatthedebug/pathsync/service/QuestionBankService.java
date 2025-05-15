package com.panicatthedebug.pathsync.service;

import com.panicatthedebug.pathsync.model.QuestionBankItem;
import com.panicatthedebug.pathsync.repo.QuestionBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class QuestionBankService {

    @Autowired
    private QuestionBankRepository questionBankRepository;

    public List<QuestionBankItem> retrieveQuestions(String targetLanguage, String difficultyLevel, String targetRole) {
        List<QuestionBankItem> allQuestions = questionBankRepository.findByCriteria(targetLanguage, difficultyLevel, targetRole);

        Collections.shuffle(allQuestions);
        List<QuestionBankItem> selectedQuestions = allQuestions.size() <= 15 ? allQuestions : allQuestions.subList(0, 15);

        for (QuestionBankItem question : selectedQuestions) {
            question.setUsageCount(question.getUsageCount() + 1);
            question.setLastUsedAt(new Date());
        }

        // Save the updated questions back to the database
        questionBankRepository.saveAll(selectedQuestions);

        // Return the selected questions
        return rephrase(selectedQuestions);
    }

    public void saveQuestion(QuestionBankItem question) {
        question.setCreatedAt(new Date());
        question.setUsageCount(0);
        questionBankRepository.save(question);
    }

    private List<QuestionBankItem> rephrase(List<QuestionBankItem> questions) {

        // TODO: Implement rephrasing logic here

        return questions;
    }
}
