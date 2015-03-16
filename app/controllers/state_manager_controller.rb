class StateManagerController < ApplicationController

  def save
    State.create(state_params)
    render json: 200
  end

  private
  def state_params
    params.permit(:bodybg, :widgetcount)
  end

end
