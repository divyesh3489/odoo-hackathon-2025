from django.http import JsonResponse
from rest_framework import renderers, status



RESPONSE_MESSAGE = {
    status.HTTP_200_OK: "OK",
    status.HTTP_201_CREATED: "Created",
    status.HTTP_204_NO_CONTENT: "No Content",
    status.HTTP_400_BAD_REQUEST: "Bad Request",
    status.HTTP_401_UNAUTHORIZED: "Unauthorized",
    status.HTTP_403_FORBIDDEN: "Forbidden",
    status.HTTP_404_NOT_FOUND: "Not Found",
}


class CustomJSONRenderer(renderers.JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context["response"].status_code

        if status_code in [
            status.HTTP_200_OK,
            status.HTTP_201_CREATED,
            status.HTTP_204_NO_CONTENT,
        ]:
            response = {
                "success": True,
                "message": RESPONSE_MESSAGE.get(status_code, None),
            }

            if data is not None:
                if "results" in data:
                    response.update(
                        {
                            "count": data["count"],
                            "next": data["next"],
                            "previous": data["previous"],
                            "data": data["results"],
                        }
                    )
                else:
                    response.update({"data": data})
        else:
            response = {
                "success": False,
                "error": {},
                "message": RESPONSE_MESSAGE.get(status_code, None),
            }

            if "detail" in data:
                response["error"]["non_field_errors"] = data["detail"]
            elif "non_field_errors" in data:
                response["error"]["non_field_errors"] = data["non_field_errors"]
            else:
                response["error"] = data

        return JsonResponse(response)
