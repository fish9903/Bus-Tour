import com.example.Controller.CourseController
import com.example.entity.Program
import com.example.models.busTourStorage
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.kodein.di.instance
import org.kodein.di.ktor.closestDI

// View
fun Route.courseRoute() {
    // course에 대한 작업은 이 controller가 전담(싱글톤 패턴 적용된 상태)
    val courseController by closestDI().instance<CourseController>()

    get("/") {
        //call.respondRedirect("server")
    }

    route("server/searchCourse") {
        get {
            // 쎰네일과 함께 course 출력
            val allCourse = courseController.getAllwithThumbnail()

            call.respond(allCourse)
        }
    }
    route("server/courseDetail/{id}") {
        get {
            // 상세 설명과 함께 course 출력
            val id = call.parameters["id"]!!.toInt()
            val allCourse = courseController.getProgramWithId(id).find{it.id == id}
            val json = Json.encodeToString(allCourse)
            println(json)
            call.respond(json)
        }
    }
    route("server/searchCourse") {
        post {
            // 쎰네일과 함께 course 출력
            val allCourse = courseController.getAllwithThumbnail()

            call.respond(allCourse)
        }
    }
}