from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    message = "You do not have permission to edit this blog post."

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
