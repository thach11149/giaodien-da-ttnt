from typing import List, Callable, Any, Dict

class Fact:
    def __init__(self, name: str, value: Any, confidence: float = 1.0):
        self.name = name
        self.value = value
        self.confidence = confidence

class Rule:
    def __init__(self, name: str, condition: Callable[[List[Fact]], bool], action: Callable[[List[Fact]], List[Fact]]):
        self.name = name
        self.condition = condition
        self.action = action

class InferenceEngine:
    def __init__(self):
        self.facts: List[Fact] = []
        self.rules: List[Rule] = []
        self.advice: List[str] = []
        self._load_rules()

    def _load_rules(self):
        # Rule 1: Weakness in specific tag
        def check_weakness(facts):
            for f in facts:
                if f.name.startswith("Score_") and f.value < 0.5:
                    return True
            return False

        def infer_weakness(facts):
            new_facts = []
            for f in facts:
                if f.name.startswith("Score_") and f.value < 0.5:
                    tag = f.name.replace("Score_", "")
                    new_facts.append(Fact(f"Weakness", tag))
                    self.advice.append(f"Cảnh báo: Bạn yếu ở phần '{tag}' (Điểm: {f.value*10:.1f}/10).")
            return new_facts

        self.rules.append(Rule("Phát hiện điểm yếu", check_weakness, infer_weakness))

        # Rule 2: High Score
        def check_high_score(facts):
            return any(f.name == "Total_Score" and f.value >= 0.8 for f in facts)
        
        def praise_student(facts):
            self.advice.append("Xuất sắc: Bạn đã nắm vững các kiến thức cơ bản!")
            return []
        
        self.rules.append(Rule("Khen ngợi điểm cao", check_high_score, praise_student))

    def analyze(self, result: Dict) -> List[str]:
        self.facts = []
        self.advice = []
        
        # Fuzzification
        self._generate_initial_facts(result)
        
        # Forward Chaining
        fired_rules = set()
        while True:
            new_facts_added = False
            for rule in self.rules:
                if rule.name in fired_rules:
                    continue
                
                if rule.condition(self.facts):
                    generated_facts = rule.action(self.facts)
                    if generated_facts:
                        self.facts.extend(generated_facts)
                        new_facts_added = True
                    fired_rules.add(rule.name)
            
            if not new_facts_added:
                break
        
        return self.advice

    def _generate_initial_facts(self, result: Dict):
        correct_count = result.get('correct_count', 0)
        total = result.get('total', 0)
        
        if total > 0:
            self.facts.append(Fact("Total_Score", correct_count / total))

        # Tag stats
        details = result.get('details', [])
        tag_stats = {}
        for detail in details:
            is_correct = detail.get("is_correct", False)
            # Assuming tags are part of question detail or we need to fetch them.
            # For now, let's assume 'tags' key exists in detail
            tags = detail.get("tags", []) 
            for tag in tags:
                if tag not in tag_stats:
                    tag_stats[tag] = [0, 0]
                tag_stats[tag][1] += 1
                if is_correct:
                    tag_stats[tag][0] += 1
        
        for tag, stats in tag_stats.items():
            ratio = stats[0] / stats[1]
            self.facts.append(Fact(f"Score_{tag}", ratio))
