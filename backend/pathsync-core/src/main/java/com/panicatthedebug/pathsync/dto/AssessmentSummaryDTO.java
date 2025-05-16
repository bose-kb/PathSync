package com.panicatthedebug.pathsync.dto;

import java.util.Map;

public class AssessmentSummaryDTO {
    private Map<String,String> questionResponses;

    public AssessmentSummaryDTO(Map<String, String> questionResponses) {
        this.questionResponses = questionResponses;
    }

    public Map<String, String> getQuestionResponses() {
        return questionResponses;
    }

    public void setQuestionResponses(Map<String, String> questionResponses) {
        this.questionResponses = questionResponses;
    }
}