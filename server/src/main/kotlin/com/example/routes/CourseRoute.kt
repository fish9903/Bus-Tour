import com.example.Controller.CourseController
import com.example.models.busTourStorage
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.closestDI

// View
fun Route.courseRoute() {
    // course에 대한 작업은 이 controller가 전담(싱글톤 패턴 적용된 상태)
    val courseController by closestDI().instance<CourseController>()

    get("/") {
        call.respondRedirect("server/")
    }

    route("server") {
        get {
            // 전체 course 출력
            val allCourse = courseController.getAllwithProgram()

            call.respond(allCourse)
        }
    }
    route("server/busInfo") {// bus 정보 출력(id, name, size)
        get {
            if (busTourStorage.isNotEmpty()) {
                call.respond(busTourStorage)
            } else {
                call.respond("bus tour is empty")
            }
        }
    }
}