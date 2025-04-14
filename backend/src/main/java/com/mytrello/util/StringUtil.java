package com.mytrello.util;

import java.util.UUID;

public class StringUtil {
    
    public static String generateUniqueId() {
        return UUID.randomUUID().toString();
    }
    
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
    
    public static String truncate(String str, int maxLength) {
        if (str == null || str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength);
    }
    
    public static String sanitize(String str) {
        if (str == null) {
            return null;
        }
        return str.trim().replaceAll("[<>]", "");
    }
} 