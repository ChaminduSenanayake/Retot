package com.uoc.retot.dto;

public class UploadFileResponseDTO {
    private String fileName;
    private String fileDownloadUri;
    private String targetLocation;
    private String fileType;
    private long size;
    private boolean success;
    private String message;

    public UploadFileResponseDTO(String fileName, String fileDownloadUri, String targetLocation, String fileType, long size) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.targetLocation = targetLocation;
        this.fileType = fileType;
        this.size = size;
    }

    public UploadFileResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileDownloadUri() {
        return fileDownloadUri;
    }

    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

    public String getTargetLocation() {
        return targetLocation;
    }

    public void setTargetLocation(String targetLocation) {
        this.targetLocation = targetLocation;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
