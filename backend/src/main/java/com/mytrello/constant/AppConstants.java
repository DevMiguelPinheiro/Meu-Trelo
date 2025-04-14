package com.mytrello.constant;

public final class AppConstants {
    private AppConstants() {
        // Private constructor to prevent instantiation
    }
    
    // API Paths
    public static final String API_BASE_PATH = "/api";
    public static final String API_VERSION = "/v1";
    public static final String API_PATH = API_BASE_PATH + API_VERSION;
    
    // Entity paths
    public static final String BOARDS_PATH = "/boards";
    public static final String COLUMNS_PATH = "/columns";
    public static final String CARDS_PATH = "/cards";
    
    // Pagination defaults
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "createdAt";
    public static final String DEFAULT_SORT_DIRECTION = "desc";
    
    // Field length constraints
    public static final int MAX_TITLE_LENGTH = 100;
    public static final int MAX_DESCRIPTION_LENGTH = 500;
    public static final int MAX_CONTENT_LENGTH = 1000;
    
    // Error messages
    public static final String RESOURCE_NOT_FOUND = "%s not found with %s : '%s'";
    public static final String INVALID_REQUEST = "Invalid request";
    public static final String UNAUTHORIZED = "Unauthorized access";
} 