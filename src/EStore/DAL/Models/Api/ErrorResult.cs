﻿using Newtonsoft.Json;

namespace DAL.Models.Api
{
    public class ErrorResult
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string InnerMessage { get; set; }
        public string InnerStackTrace { get; set; }

        public ErrorResult()
        {
        }

        public ErrorResult(int code, string message)
        {
            this.Code = code;
            this.Message = message;
        }

        public ErrorResult(int code, Exception exception)
        {
            this.Code = code;
            this.Message = exception.Message;
            this.StackTrace = exception.StackTrace;
            this.InnerMessage = exception.InnerException?.Message;
            this.InnerStackTrace = exception.InnerException?.StackTrace;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}