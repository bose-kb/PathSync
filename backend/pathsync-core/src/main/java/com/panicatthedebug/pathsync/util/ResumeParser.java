package com.panicatthedebug.pathsync.util;

import com.panicatthedebug.pathsync.model.ResumeDetails;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ResumeParser {

    public ResumeDetails parseResume(MultipartFile file) throws IOException, TikaException {

        Tika tika = new Tika();
        String content = tika.parseToString(file.getInputStream());


        String[] names = extractName(content);
        String firstName = names[0];
        String lastName = names[1];
        String email = extractEmail(content);
        List<String> skills = extractSkills(content);


        return new ResumeDetails(firstName, lastName, email, skills);
    }

    private String[] extractName(String content) {
        String firstName = "Unknown";
        String lastName = "Unknown";

        // Try multiple patterns to extract the name

        // Pattern 1: Look for "Name: FirstName LastName" or similar labels
        Pattern fullNamePattern = Pattern.compile("(?i)(?:name|full name|candidate)[\\s:]+([A-Za-z]+[\\s-']*[A-Za-z]+)");
        Matcher fullNameMatcher = fullNamePattern.matcher(content);

        // Pattern 2: Look for "First Name: FirstName" and "Last Name: LastName" patterns
        Pattern firstNamePattern = Pattern.compile("(?i)(?:first name|firstname)[\\s:]+([A-Za-z]+[\\s-']*[A-Za-z]*)");
        Pattern lastNamePattern = Pattern.compile("(?i)(?:last name|lastname|surname)[\\s:]+([A-Za-z]+[\\s-']*[A-Za-z]*)");

        // Pattern 3: Often resumes start with the name at the top
        // This is less reliable but works as a fallback
        Pattern topNamePattern = Pattern.compile("^\\s*([A-Z][a-z]+[\\s-'][A-Z][a-z]+)");

        // Try to find the full name first
        if (fullNameMatcher.find()) {
            String fullName = fullNameMatcher.group(1).trim();
            String[] nameParts = fullName.split("\\s+", 2);
            if (nameParts.length > 0) firstName = nameParts[0];
            if (nameParts.length > 1) lastName = nameParts[1];
        }
        // Try specific first/last name fields
        else {
            Matcher firstNameMatcher = firstNamePattern.matcher(content);
            Matcher lastNameMatcher = lastNamePattern.matcher(content);

            if (firstNameMatcher.find()) {
                firstName = firstNameMatcher.group(1).trim();
            }

            if (lastNameMatcher.find()) {
                lastName = lastNameMatcher.group(1).trim();
            }
            // Last resort - try to find name at the top of document
            else if (firstName.equals("Unknown")) {
                Matcher topNameMatcher = topNamePattern.matcher(content);
                if (topNameMatcher.find()) {
                    String fullName = topNameMatcher.group(1).trim();
                    String[] nameParts = fullName.split("\\s+", 2);
                    if (nameParts.length > 0) firstName = nameParts[0];
                    if (nameParts.length > 1) lastName = nameParts[1];
                }
            }
        }

        return new String[] { firstName, lastName };
    }

    private String extractEmail(String content) {
        Pattern pattern = Pattern.compile("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}");
        Matcher matcher = pattern.matcher(content);
        return matcher.find() ? matcher.group() : "unknown@example.com";
    }

    private List<String> extractSkills(String content) {
        List<String> skills = new ArrayList<>();

        String[] skillKeywords = {
                "Java", "Spring", "Spring Boot", "MongoDB", "SQL", "MySQL", "PostgreSQL",
                "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js",
                "Docker", "Kubernetes", "AWS", "Azure", "GCP", "DevOps", "CI/CD",
                "Git", "Jenkins", "Microservices", "REST", "GraphQL", "Agile", "Scrum",
                "Python", "C#", ".NET", "PHP", "Ruby", "Go", "Rust", "C++", "C",
                "HTML", "CSS", "SASS", "LESS", "Bootstrap", "Tailwind",
                "Redis", "Kafka", "RabbitMQ", "Elasticsearch", "Hadoop", "Spark"
        };

        for (String skill : skillKeywords) {
            if (content.toLowerCase().contains(skill.toLowerCase())) {
                skills.add(skill);
            }
        }

        return skills;
    }
}
