package com.example.Controller

import com.example.entity.CourseEntity
import com.example.entity.CourseWithPrograms
import com.example.entity.CourseWithThumbnail
import org.jetbrains.exposed.dao.with
import org.jetbrains.exposed.sql.transactions.transaction

class CourseController {
    // 썸내일과 함께 반환
    fun getAllwithThumbnail(): Iterable<CourseWithThumbnail> = transaction {
        CourseEntity.all().map(CourseEntity::getCourseWithThumbnail)
    }
    // program과 함께 반환
    fun getAllwithProgram(): Iterable<CourseWithPrograms> = transaction {
        CourseEntity.all().with(
            CourseEntity::programs,
            CourseEntity::priceinfos
        ).map(CourseEntity::getCourseWithPrograms)
    }
}