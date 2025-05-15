package com.panicatthedebug.pathsync.service;

import com.panicatthedebug.pathsync.model.QuestionBankItem;
import com.panicatthedebug.pathsync.repo.QuestionBankRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionBankService {

    @Autowired
    private QuestionBankRepository questionBankRepository;

    @Autowired
    private ChatClient openAiChatClient;

    public List<QuestionBankItem> retrieveQuestions(String targetLanguage, String difficultyLevel, String targetRole) {
        List<QuestionBankItem> allQuestions = questionBankRepository.findByCriteria(targetLanguage, difficultyLevel, targetRole);

        // Select questions based on least usage count and last used date
        List<QuestionBankItem> selectedQuestions = allQuestions.stream()
                .sorted(Comparator.comparingInt(QuestionBankItem::getUsageCount))
                .limit(15).collect(Collectors.toList());

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

        for(QuestionBankItem question : questions) {
            System.out.println(question.getText());
            Prompt prompt = new Prompt(new UserMessage("Rephrase the following question: " + question.getText()));
            String rephrasedQuestion = openAiChatClient.prompt(prompt).call().content();
            question.setText(rephrasedQuestion);
            System.out.println();
            System.out.println(rephrasedQuestion);
        }

        return questions;
    }
}
