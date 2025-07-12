from rest_framework import pagination


class CustomPagination(pagination.LimitOffsetPagination):
    default_limit = 10

    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get(self.limit_query_param) == "all":
            return None

        return super(CustomPagination, self).paginate_queryset(queryset=queryset, request=request, view=view)
