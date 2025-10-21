
package com.buddy.taskmanager.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TaskConsumer {

    @KafkaListener(topics = "task-events", groupId = "task-group")
    public void consume(String message) {
        System.out.println("📥 Received message from Kafka: " + message);
    }
}
