package com.ssafy.beconofstock.board.repository;

import com.ssafy.beconofstock.board.entity.Comment;
import com.ssafy.beconofstock.board.entity.CommentRel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRelRepository extends JpaRepository<CommentRel, Long> {
    List<CommentRel> findAllByParent(Comment parent);

    CommentRel findByChild(Comment child);

    void deleteByChild(Comment child);

    @Query(value = "SELECT comm " +
        "FROM Comment comm " +
        "INNER JOIN CommentRel rel ON rel.child = comm " +
        "WHERE rel.parent = :paramComment")
    List<Comment> findAllByJoinParent(@Param(value = "paramComment") Comment comment);
}
