import math

@namespace
class useful:
    def rotate_point(point, angle):
        cos_theta = math.cos(angle)
        sin_theta = math.sin(angle)
        
        x_rotated = cos_theta * point[0] - sin_theta * point[1]
        y_rotated = sin_theta * point[0] + cos_theta * point[1]
        
        return [x_rotated, y_rotated]

    def project_point_with_rotation(point, angle):
        rotated_point = rotate_point(point, angle)
        
        f = 2
        
        x_proj = rotated_point[0] / (point[2] + f)
        y_proj = rotated_point[1] / (point[2] + f)
        
        return [x_proj, y_proj]
