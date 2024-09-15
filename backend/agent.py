from uagents import Agent, Context
import logging as logger
from llm_call import get_response
 
agent = Agent(name="alice", seed="secret_seed_phrase")
tough_letters = list(set(['t', 'a', 'u', 'g', 'h']))

@agent.on_event("startup")
async def start_agent(ctx: Context):
    if tough_letters:
        response = get_response(f"Provide one simple sentence with more of the following letters in it: {tough_letters}. Do not inclde more sentences")
    else:
        response = get_response("Provide one simple english sentence")    
    ctx.logger.info(response)
 

agent.run()