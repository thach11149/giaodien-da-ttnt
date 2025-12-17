from abc import ABC, abstractmethod

class ExamGenerationStrategy(ABC):
    @abstractmethod
    def generate(self, params):
        pass
