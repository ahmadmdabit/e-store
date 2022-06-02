﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using COMN.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.Entities.Base;
using DAL.Models.Api;
using BLL.Businesses.Base;

namespace API.Controllers.Base
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Helpers.Attributes.Authorize(Roles = "SysAdmin, Admin, Customer")]
    public class BaseApiController<TEntity> : ControllerBase, IApiController<TEntity>
        where TEntity : BaseEntity, IEntity
    {
        protected readonly IBusiness<TEntity> _business;
        protected readonly ILogger _logger;
        protected readonly IActionContextAccessor _accessor;
        protected readonly string _ip;

        protected BaseApiController(IBusiness<TEntity> business, ILogger<BaseApiController<TEntity>> logger, IActionContextAccessor accessor)
        {
            this._business = business;
            this._logger = logger;
            this._accessor = accessor;
            this._ip = this._accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<ApiResult<TEntity>>> Delete(long id)
        {
            this._logger.LogInformation($"[Delete:{id}] [{this._ip}]");
            var entity = await this._business.Delete(id).ConfigureAwait(false);
            if (entity != null)
            {
                return Ok(new ApiResult<TEntity>(true, entity, null));
            }
            return this.NotFoundApi();
        }

        // GET: api/[controller]
        [HttpGet]
        public virtual async Task<ActionResult<ApiResult<List<TEntity>>>> Get()
        {
            this._logger.LogInformation($"[Get] [{this._ip}]");
            return Ok(new ApiResult<List<TEntity>>(true, await this._business.GetAll().ConfigureAwait(false), null));
        }

        // GET: api/[controller]/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<ApiResult<TEntity>>> Get(long id)
        {
            this._logger.LogInformation($"[Get:{id}] [{this._ip}]");
            var entity = await this._business.Get(id).ConfigureAwait(false);
            if (entity != null)
            {
                return Ok(new ApiResult<TEntity>(true, entity, null));
            }
            return this.NotFoundApi();
        }

        // GET: api/[controller]/by/id/5
        [HttpGet("by/{propertyName}/{propertyValue}")]
        public virtual async Task<ActionResult<ApiResult<List<TEntity>>>> GetBy([FromRoute] string propertyName, [FromRoute] string propertyValue)
        {
            this._logger.LogInformation($"[Get:by/{propertyName}/{propertyValue}] [{this._ip}]");
            var entities = await this._business.GetBy(propertyName, propertyValue).ConfigureAwait(false);
            return Ok(new ApiResult<List<TEntity>>(true, entities, null));
        }

        // GET: api/[controller]/by/id/5/name/test
        [HttpGet("by/{property1Name}/{property1Value}/{property2Name}/{property2Value}")]
        public virtual async Task<ActionResult<ApiResult<List<TEntity>>>> GetBy(
            [FromRoute] string property1Name, [FromRoute] string property1Value, [FromRoute] string property2Name, [FromRoute] string property2Value)
        {
            this._logger.LogInformation($"[Get:by/{property1Name}/{property1Value}/{property2Name}/{property2Value}] [{this._ip}]");
            var entities = await this._business.GetBy(property1Name, property1Value, property2Name, property2Value).ConfigureAwait(false);
            return Ok(new ApiResult<List<TEntity>>(true, entities, null));
        }

        // POST: api/[controller]
        [HttpPost]
        public virtual async Task<ActionResult<ApiResult<TEntity>>> Post([FromBody] TEntity entity)
        {
            //return null;
            this._logger.LogInformation($"[Post] [{this._ip}] {JsonConvert.SerializeObject(entity)}");
            var businessEntity = await this._business.Add(entity).ConfigureAwait(false);
            if (businessEntity != null)
            {
                return Ok(new ApiResult<TEntity>(true, businessEntity, null));
            }
            return this.BadRequestApi();
        }

        // PUT: api/[controller]/5
        [HttpPut("{id}")]
        public virtual async Task<ActionResult<ApiResult<TEntity>>> Put([FromBody] TEntity entity)
        {
            this._logger.LogInformation($"[Put] [{this._ip}] {JsonConvert.SerializeObject(entity)}");
            var businessEntity = await this._business.Update(entity).ConfigureAwait(false);
            if (businessEntity != null)
            {
                return Ok(new ApiResult<TEntity>(true, businessEntity, null));
            }
            return this.BadRequestApi();
        }

        protected virtual ActionResult<ApiResult<TEntity>> NotFoundApi()
        {
            this._logger.LogInformation("NotFound");
            return Ok(new ApiResult<TEntity>(false, null, new NotFoundResult().StatusCode, "NotFound"));
        }

        protected virtual ActionResult<ApiResult<TEntity>> BadRequestApi()
        {
            this._logger.LogInformation("BadRequest");
            return Ok(new ApiResult<TEntity>(false, null, new BadRequestResult().StatusCode, "BadRequest"));
        }
    }
}
