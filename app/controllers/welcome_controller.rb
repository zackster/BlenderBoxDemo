class WelcomeController < ApplicationController

  def index
  end

  def otherpage
    if State.last
      @state = State.last
      case @state.bodybg
      when '#ffffff'
      when '#FFFFFF'
      when '#fff'
      when '#FFF'
        puts 'ho'
        @state_visible = 'invisible'
      else
        puts 'hi'
        @state_visible = 'visible'
      end
    else
      @state = {:bodybg => '#FFFFFF', :widgetcount => 1}
      @state_visible = 'invisible'
    end
  end
end
