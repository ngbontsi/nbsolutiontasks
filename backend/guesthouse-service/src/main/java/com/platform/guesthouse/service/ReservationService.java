package com.platform.guesthouse.service;

import com.platform.guesthouse.dto.ReservationRequest;
import com.platform.guesthouse.dto.ReservationResponse;
import com.platform.guesthouse.exception.ResourceNotFoundException;
import com.platform.guesthouse.model.Reservation;
import com.platform.guesthouse.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;

    public ReservationResponse create(ReservationRequest request) {
        Reservation reservation = Reservation.builder()
                .roomId(request.roomId())
                .userId(request.userId())
                .checkInDate(LocalDate.parse(request.checkInDate()))
                .checkOutDate(LocalDate.parse(request.checkOutDate()))
                .numberOfGuests(request.numberOfGuests())
                .build();

        var room = roomService.getByIdEntity(request.roomId());
        long nights = java.time.temporal.ChronoUnit.DAYS.between(
            reservation.getCheckInDate(), reservation.getCheckOutDate());
        reservation.setTotalPrice(room.getPricePerNight().doubleValue() * nights);

        return toResponse(reservationRepository.save(reservation));
    }

    public List<ReservationResponse> getByUser(String userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public ReservationResponse getById(String id) {
        return toResponse(reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found")));
    }

    private ReservationResponse toResponse(Reservation r) {
        return new ReservationResponse(
                r.getId(), r.getRoomId(), r.getUserId(),
                r.getCheckInDate(), r.getCheckOutDate(), r.getNumberOfGuests(),
                r.getStatus(), r.getTotalPrice(), r.getCreatedAt()
        );
    }
}