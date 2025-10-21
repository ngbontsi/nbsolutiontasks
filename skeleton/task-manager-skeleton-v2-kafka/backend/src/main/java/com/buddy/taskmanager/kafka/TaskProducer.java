
package com.buddy.taskmanager.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendTaskEvent(String message) {
        kafkaTemplate.send("task-events", message);
        System.out.println("📤 Sent message to Kafka: " + message);
    }
}
